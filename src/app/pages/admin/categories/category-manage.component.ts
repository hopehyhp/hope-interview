import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Category } from '../../../core/models/bank.model';
import { CategoryService } from '../../../core/services/category.service';
import { QuestionService } from '../../../core/services/question.service';

@Component({
  selector: 'app-category-manage',
  templateUrl: './category-manage.component.html',
  styleUrls: ['./category-manage.component.scss']
})
export class CategoryManageComponent {
  editing: Category | null = null;
  confirming: Category | null = null;
  error = '';
  showForm = false;

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(20)]],
    sort: [0, [Validators.required]],
    description: ['']
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly categories: CategoryService,
    private readonly questions: QuestionService
  ) {}

  get rows(): Category[] {
    return this.categories.list();
  }

  countOf(id: string): number {
    return this.questions.count(id);
  }

  openCreate(): void {
    this.editing = null;
    this.error = '';
    this.form.reset({ name: '', sort: this.rows.length + 1, description: '' });
    this.showForm = true;
  }

  openEdit(row: Category): void {
    this.editing = row;
    this.error = '';
    this.form.reset({ name: row.name, sort: row.sort, description: row.description });
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
    const payload = this.form.getRawValue();
    const result = this.editing
      ? this.categories.update(this.editing.id, payload)
      : this.categories.create(payload);
    if (!result.ok) {
      this.error = result.message;
      return;
    }
    this.closeForm();
  }

  askDelete(row: Category): void {
    this.confirming = row;
  }

  doDelete(): void {
    if (!this.confirming) {
      return;
    }
    if (this.questions.count(this.confirming.id) > 0) {
      this.error = '该分类下仍有题目，请先移动或删除题目';
      this.confirming = null;
      return;
    }
    this.categories.delete(this.confirming.id);
    this.confirming = null;
  }
}
