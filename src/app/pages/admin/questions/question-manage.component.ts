import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { DIFF_LABELS, Difficulty, Question, QuestionType, TYPE_LABELS } from '../../../core/models/bank.model';
import { CategoryService } from '../../../core/services/category.service';
import { BankIoService } from '../../../core/services/bank-io.service';
import { QuestionPayload, QuestionService } from '../../../core/services/question.service';

@Component({
  selector: 'app-question-manage',
  templateUrl: './question-manage.component.html',
  styleUrls: ['./question-manage.component.scss']
})
export class QuestionManageComponent {
  readonly typeLabels = TYPE_LABELS;
  readonly diffLabels = DIFF_LABELS;
  keyword = '';
  categoryId = '';
  type: QuestionType | '' = '';
  editing: Question | null = null;
  confirming: Question | null = null;
  showForm = false;
  error = '';
  ioMsg = '';
  selectedKeys: string[] = [];

  readonly form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(80)]],
    categoryId: ['', Validators.required],
    type: ['essay' as QuestionType, Validators.required],
    difficulty: ['medium' as Difficulty, Validators.required],
    analysis: ['', Validators.required],
    enabled: [true],
    options: this.fb.array([])
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly categories: CategoryService,
    private readonly questions: QuestionService,
    private readonly bankIo: BankIoService
  ) {}

  get categoryList() {
    return this.categories.list();
  }

  get rows(): Question[] {
    return this.questions.list({
      keyword: this.keyword,
      categoryId: this.categoryId || undefined,
      type: this.type
    });
  }

  get options(): FormArray {
    return this.form.get('options') as FormArray;
  }

  get isChoice(): boolean {
    return this.form.controls.type.value !== 'essay';
  }

  categoryName(id: string): string {
    return this.categories.nameOf(id);
  }

  get isJudge(): boolean {
    return this.form.controls.type.value === 'judge';
  }

  onTypeChange(type: QuestionType): void {
    this.form.controls.type.setValue(type);
    this.selectedKeys = [];
    if (type === 'essay') {
      this.options.clear();
      return;
    }
    if (type === 'judge') {
      this.fillJudge();
      return;
    }
    if (this.isJudgeOptions()) {
      this.options.clear();
    }
    if (!this.options.length) {
      ['A', 'B', 'C', 'D'].forEach((key) => this.addOption(key));
    }
  }

  private fillJudge(): void {
    this.options.clear();
    this.addOption('T');
    this.options.at(0).patchValue({ key: 'T', text: '正确' });
    this.addOption('F');
    this.options.at(1).patchValue({ key: 'F', text: '错误' });
  }

  private isJudgeOptions(): boolean {
    return this.options.length === 2 && this.optionKey(0) === 'T';
  }

  addOption(key?: string): void {
    const keys = 'ABCDEFGH';
    const nextKey = key || keys[this.options.length] || String(this.options.length + 1);
    this.options.push(
      this.fb.nonNullable.group({
        key: [nextKey, Validators.required],
        text: ['', Validators.required]
      })
    );
  }

  removeOption(index: number): void {
    const key = (this.options.at(index).value as { key: string }).key;
    this.options.removeAt(index);
    this.selectedKeys = this.selectedKeys.filter((item) => item !== key);
  }

  toggleKey(key: string): void {
    const type = this.form.controls.type.value;
    if (type === 'single' || type === 'judge') {
      this.selectedKeys = [key];
      return;
    }
    this.selectedKeys = this.selectedKeys.includes(key)
      ? this.selectedKeys.filter((item) => item !== key)
      : [...this.selectedKeys, key].sort();
  }

  isChecked(key: string): boolean {
    return this.selectedKeys.includes(key);
  }

  optionKey(index: number): string {
    return String((this.options.at(index).value as { key: string }).key || '');
  }

  openCreate(): void {
    this.editing = null;
    this.error = '';
    this.selectedKeys = [];
    this.form.reset({
      title: '',
      categoryId: this.categoryList[0]?.id ?? '',
      type: 'essay',
      difficulty: 'medium',
      analysis: '',
      enabled: true
    });
    this.options.clear();
    this.showForm = true;
  }

  openEdit(row: Question): void {
    this.editing = row;
    this.error = '';
    this.form.reset({
      title: row.title,
      categoryId: row.categoryId,
      type: row.type,
      difficulty: row.difficulty,
      analysis: row.analysis,
      enabled: row.enabled
    });
    this.options.clear();
    row.options.forEach((opt) => {
      this.options.push(this.fb.nonNullable.group({ key: [opt.key], text: [opt.text] }));
    });
    this.selectedKeys = row.answer ? row.answer.split(',') : [];
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.error = '';
  }

  save(): void {
    this.error = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const raw = this.form.getRawValue();
    const payload: QuestionPayload = {
      title: raw.title.trim(),
      categoryId: raw.categoryId,
      type: raw.type,
      difficulty: raw.difficulty,
      options: this.options.getRawValue() as { key: string; text: string }[],
      answer: raw.type === 'essay' ? '' : this.selectedKeys.join(','),
      analysis: raw.analysis.trim(),
      enabled: raw.enabled
    };
    const result = this.editing
      ? this.questions.update(this.editing.id, payload)
      : this.questions.create(payload);
    if (!result.ok) {
      this.error = result.message;
      return;
    }
    this.closeForm();
  }

  askDelete(row: Question): void {
    this.confirming = row;
  }

  doDelete(): void {
    if (this.confirming) {
      this.questions.delete(this.confirming.id);
      this.confirming = null;
    }
  }

  exportBank(): void {
    this.ioMsg = '';
    const blob = new Blob([JSON.stringify(this.bankIo.export(), null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hope-bank-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    this.ioMsg = '题库已导出';
  }

  importBank(event: Event, mode: 'merge' | 'replace'): void {
    this.ioMsg = '';
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) {
      return;
    }
    if (mode === 'replace' && !confirm('覆盖导入会替换当前全部分类和题目，确定继续？')) {
      return;
    }
    file.text().then((raw) => {
      const result = this.bankIo.importJson(raw, mode);
      this.ioMsg = result.message;
    });
  }
}
