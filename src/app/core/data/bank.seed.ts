import { Category, Question } from '../models/bank.model';

export const SEED_CATEGORIES: Category[] = [
  { id: 'cat-fe', name: '前端基础', sort: 1, description: 'HTML / CSS / 浏览器', createdAt: 1710000000000 },
  { id: 'cat-js', name: 'JavaScript', sort: 2, description: '语言机制与运行时', createdAt: 1710000000000 },
  { id: 'cat-fw', name: '框架与工程', sort: 3, description: 'Vue / React / 工程化', createdAt: 1710000000000 },
  { id: 'cat-net', name: '计算机网络', sort: 4, description: 'HTTP / TCP / 安全', createdAt: 1710000000000 },
  { id: 'cat-algo', name: '算法与数据结构', sort: 5, description: '复杂度与常见题型', createdAt: 1710000000000 },
  { id: 'cat-hr', name: '行为面试', sort: 6, description: '项目经历与沟通', createdAt: 1710000000000 }
];

export const SEED_QUESTIONS: Question[] = [
  {
    id: 'q-1',
    title: '什么是闭包？常见应用场景有哪些？',
    categoryId: 'cat-js',
    type: 'essay',
    difficulty: 'medium',
    options: [],
    answer: '',
    analysis:
      '闭包是函数与其词法环境的组合，使内部函数可以访问外层作用域变量。典型场景：模块封装、函数柯里化、事件回调中保存状态。注意循环中用 let 或立即执行函数避免变量泄漏，以及闭包持有引用导致的内存占用。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-2',
    title: '下列关于 JavaScript 原型的描述，哪一项是正确的？',
    categoryId: 'cat-js',
    type: 'single',
    difficulty: 'medium',
    options: [
      { key: 'A', text: '实例的 __proto__ 指向其构造函数本身' },
      { key: 'B', text: '实例的 [[Prototype]] 指向构造函数的 prototype' },
      { key: 'C', text: 'prototype 与 __proto__ 是同一个指针' },
      { key: 'D', text: '原型链查找会改写对象自有属性' }
    ],
    answer: 'B',
    analysis:
      '实例通过 [[Prototype]]（可通过 __proto__ 观察）链接到构造函数的 prototype。prototype 是函数上的属性，__proto__ 是对象上的隐式链接，两者不是同一概念。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-3',
    title: '从浏览器地址栏输入 URL 到页面呈现，主要经历哪些阶段？',
    categoryId: 'cat-fe',
    type: 'essay',
    difficulty: 'hard',
    options: [],
    answer: '',
    analysis:
      '可按 DNS 解析 → 建立 TCP（HTTPS 还需 TLS）→ 发送 HTTP 请求 → 接收响应 → 解析 HTML 构建 DOM → 解析 CSS 构建 CSSOM → 合成渲染树 → 布局与绘制。其中可穿插预加载、缓存命中、重定向。面试时按链路讲清，再点出关键优化即可。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-4',
    title: '下列哪些操作更容易触发回流（reflow）？',
    categoryId: 'cat-fe',
    type: 'multiple',
    difficulty: 'medium',
    options: [
      { key: 'A', text: '修改元素宽高或位置' },
      { key: 'B', text: '读取 offsetWidth / getBoundingClientRect' },
      { key: 'C', text: '只改 color、background-color' },
      { key: 'D', text: '增删 DOM 节点' }
    ],
    answer: 'A,B,D',
    analysis:
      '几何信息变化、增删节点会回流；读取布局尺寸可能强制同步布局。单纯改颜色通常只引起重绘。批量改 DOM 时应用文档碎片或 class 合并，避免交错读写。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-5',
    title: '标准盒模型中，element.style.width 设置的是哪一部分？',
    categoryId: 'cat-fe',
    type: 'single',
    difficulty: 'easy',
    options: [
      { key: 'A', text: 'content 宽度' },
      { key: 'B', text: 'content + padding' },
      { key: 'C', text: 'content + padding + border' },
      { key: 'D', text: 'margin 以内全部' }
    ],
    answer: 'A',
    analysis:
      '默认 content-box 下 width 只表示内容区。box-sizing: border-box 时 width 包含 padding 与 border。面试可顺带对比两种盒模型。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-6',
    title: '比较 Vue 与 React 在更新机制上的主要差异。',
    categoryId: 'cat-fw',
    type: 'essay',
    difficulty: 'hard',
    options: [],
    answer: '',
    analysis:
      'React 以函数组件 + 不可变数据为主，更新由 setState/dispatch 触发，协调 Fiber 与 Diff。Vue 3 基于 Proxy 的细粒度依赖收集，组件级更新更精确。模板编译、指令与单文件组件是 Vue 的工程特点；React 更强调 JSX 与生态灵活性。回答时选 2～3 点展开即可。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-7',
    title: '虚拟 DOM 的核心价值更接近哪一项？',
    categoryId: 'cat-fw',
    type: 'single',
    difficulty: 'easy',
    options: [
      { key: 'A', text: '保证一定比直接操作 DOM 更快' },
      { key: 'B', text: '用声明式 UI 描述界面，并批量、可预测地更新' },
      { key: 'C', text: '彻底避免回流重绘' },
      { key: 'D', text: '替代浏览器的渲染流水线' }
    ],
    answer: 'B',
    analysis:
      '虚拟 DOM 并不总是性能最优，价值在于把 UI 变成数据快照，便于 Diff 与跨端渲染。少量确定的 DOM 操作有时更快。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-8',
    title: 'TCP 三次握手解决的核心问题是什么？',
    categoryId: 'cat-net',
    type: 'essay',
    difficulty: 'medium',
    options: [],
    answer: '',
    analysis:
      '双方交换初始序号并确认对方收发能力，避免历史重复连接、半开连接。流程：SYN → SYN+ACK → ACK。可补充四次挥手、TIME_WAIT 与 HTTPS 中 TLS 握手的层次差异。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-9',
    title: 'HTTPS 相对 HTTP，主要增加了哪一层？',
    categoryId: 'cat-net',
    type: 'single',
    difficulty: 'easy',
    options: [
      { key: 'A', text: '在 TCP 与 HTTP 之间加入 TLS' },
      { key: 'B', text: '把 HTTP 换成了 UDP' },
      { key: 'C', text: '由浏览器单独加密 HTML' },
      { key: 'D', text: '仅在网关做一次 IP 伪装' }
    ],
    answer: 'A',
    analysis:
      'HTTPS = HTTP over TLS。证书用于身份校验，对称密钥用于传输加密。HTTP/2、HTTP/3 仍可建立在加密通道之上。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-10',
    title: '下列排序算法的平均时间复杂度可以达到 O(n log n) 的有哪些？',
    categoryId: 'cat-algo',
    type: 'multiple',
    difficulty: 'medium',
    options: [
      { key: 'A', text: '快速排序' },
      { key: 'B', text: '归并排序' },
      { key: 'C', text: '堆排序' },
      { key: 'D', text: '冒泡排序' }
    ],
    answer: 'A,B,C',
    analysis:
      '快排平均 O(n log n)、最坏 O(n²)；归并与堆排序稳定为 O(n log n)；冒泡为 O(n²)。可补充稳定性与额外空间。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-11',
    title: '简述 Event Loop 中宏任务与微任务的执行顺序。',
    categoryId: 'cat-js',
    type: 'essay',
    difficulty: 'medium',
    options: [],
    answer: '',
    analysis:
      '执行一个宏任务（如 script、setTimeout 回调），再清空微任务队列（Promise.then、MutationObserver、queueMicrotask），然后可能渲染，再取下一个宏任务。async/await 在 await 之后的代码进入微任务。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-12',
    title: '请讲一次你负责的项目中，印象最深的技术难点与处理方式。',
    categoryId: 'cat-hr',
    type: 'essay',
    difficulty: 'hard',
    options: [],
    answer: '',
    analysis:
      '建议 STAR：背景与目标、你的职责、具体手段（数据、方案对比、取舍）、结果（指标、复盘）。避免只罗列技术名词，要点出判断依据与协作方式。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-13',
    title: 'JavaScript 中，null == undefined 的结果为 true。',
    categoryId: 'cat-js',
    type: 'judge',
    difficulty: 'easy',
    options: [
      { key: 'T', text: '正确' },
      { key: 'F', text: '错误' }
    ],
    answer: 'T',
    analysis: '== 会做类型转换，null 与 undefined 互相相等，但与其他值都不相等。严格相等 === 则为 false。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-14',
    title: 'HTTP 本身是无状态协议。',
    categoryId: 'cat-net',
    type: 'judge',
    difficulty: 'easy',
    options: [
      { key: 'T', text: '正确' },
      { key: 'F', text: '错误' }
    ],
    answer: 'T',
    analysis: '每次请求默认独立。Cookie、Session、Token 是在应用层补状态的常见手段。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-15',
    title: 'position: absolute 一定是相对浏览器视口定位。',
    categoryId: 'cat-fe',
    type: 'judge',
    difficulty: 'easy',
    options: [
      { key: 'T', text: '正确' },
      { key: 'F', text: '错误' }
    ],
    answer: 'F',
    analysis: 'absolute 相对最近的非 static 祖先定位；都没有时才相对初始包含块（常表现为视口）。相对视口更准确的是 fixed。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-16',
    title: 'Array.prototype.sort 默认按数值大小排序。',
    categoryId: 'cat-js',
    type: 'judge',
    difficulty: 'easy',
    options: [
      { key: 'T', text: '正确' },
      { key: 'F', text: '错误' }
    ],
    answer: 'F',
    analysis: '默认把元素转成字符串后按 UTF-16 码元比较，所以 [10, 2] 会变成 [10, 2] 的字典序问题。数值排序需传入比较函数。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-17',
    title: '只修改元素的 color / opacity，通常会触发回流（reflow）。',
    categoryId: 'cat-fe',
    type: 'judge',
    difficulty: 'medium',
    options: [
      { key: 'T', text: '正确' },
      { key: 'F', text: '错误' }
    ],
    answer: 'F',
    analysis: '颜色、透明度变化一般只引起重绘或合成，不改几何信息。回流多由宽高、位置、增删节点、读取布局属性等触发。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-18',
    title: 'CSS 中，下列哪一项选择器优先级最高？',
    categoryId: 'cat-fe',
    type: 'single',
    difficulty: 'easy',
    options: [
      { key: 'A', text: '类选择器 .box' },
      { key: 'B', text: '标签选择器 div' },
      { key: 'C', text: 'ID 选择器 #app' },
      { key: 'D', text: '通配符 *' }
    ],
    answer: 'C',
    analysis: '常见优先级：!important > 行内 style > ID > 类/属性/伪类 > 标签/伪元素 > *。同等时后写覆盖先写。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-19',
    title: '下列哪些条件可以形成 BFC？',
    categoryId: 'cat-fe',
    type: 'multiple',
    difficulty: 'medium',
    options: [
      { key: 'A', text: 'overflow 不为 visible（如 auto / hidden）' },
      { key: 'B', text: 'float 不为 none' },
      { key: 'C', text: 'display: flex 的子项' },
      { key: 'D', text: 'position: static 的普通块盒' }
    ],
    answer: 'A,B,C',
    analysis: 'BFC 常见触发：根元素、float、绝对/固定定位、overflow 非 visible、display 为 inline-block/flex/grid/flow-root 等。普通 static 块盒本身不形成新 BFC。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-20',
    title: '简述几种水平垂直居中的实现方式。',
    categoryId: 'cat-fe',
    type: 'essay',
    difficulty: 'medium',
    options: [],
    answer: '',
    analysis:
      'Flex：父级 display:flex; align-items:center; justify-content:center。Grid：place-items:center。定位：子元素 absolute + top/left 50% + transform:translate(-50%,-50%)。已知宽高也可用负 margin。回答时点出适用场景与对未知尺寸的差异。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-21',
    title: 'inline 元素可以直接设置 width / height 并生效。',
    categoryId: 'cat-fe',
    type: 'judge',
    difficulty: 'easy',
    options: [
      { key: 'T', text: '正确' },
      { key: 'F', text: '错误' }
    ],
    answer: 'F',
    analysis: '非替换的 inline 元素（如 span）设置宽高无效。inline-block、block、flex 项或替换元素（img、input）才可按盒模型设置尺寸。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-22',
    title: 'script 标签上 defer 与 async 的正确描述是？',
    categoryId: 'cat-fe',
    type: 'single',
    difficulty: 'medium',
    options: [
      { key: 'A', text: '二者都会阻塞 HTML 解析' },
      { key: 'B', text: 'async 按文档顺序执行，defer 谁先下载完谁先执行' },
      { key: 'C', text: 'defer 在 DOM 解析完成后按文档顺序执行；async 下载完立即执行，不保证顺序' },
      { key: 'D', text: 'defer 只对内联脚本生效' }
    ],
    answer: 'C',
    analysis: 'defer：并行下载，解析完成后按出现顺序执行，不阻塞解析。async：下载完立刻执行，可能打断解析，多脚本无序。二者主要作用于外部脚本。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-23',
    title: '下列哪些属于 HTML5 语义化标签？',
    categoryId: 'cat-fe',
    type: 'multiple',
    difficulty: 'easy',
    options: [
      { key: 'A', text: 'header / nav / footer' },
      { key: 'B', text: 'article / section' },
      { key: 'C', text: 'div / span' },
      { key: 'D', text: 'aside / main' }
    ],
    answer: 'A,B,D',
    analysis: '语义化标签表达结构含义，利于无障碍与 SEO。div/span 是无语义容器。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-24',
    title: '浏览器强缓存与协商缓存分别如何判断？常见响应头有哪些？',
    categoryId: 'cat-fe',
    type: 'essay',
    difficulty: 'medium',
    options: [],
    answer: '',
    analysis:
      '强缓存看 Cache-Control（max-age）或 Expires，命中则 200 from cache / memory/disk cache，不发请求。未命中带 If-None-Match（ETag）或 If-Modified-Since（Last-Modified）协商，未改返回 304。Cache-Control: no-cache 表示每次协商；no-store 禁止缓存。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-25',
    title: 'typeof null 的结果是 "object"。',
    categoryId: 'cat-js',
    type: 'judge',
    difficulty: 'easy',
    options: [
      { key: 'T', text: '正确' },
      { key: 'F', text: '错误' }
    ],
    answer: 'T',
    analysis: '历史 bug：早期类型标签把 null 标成对象。判断空值应用 === null，或配合 typeof 检查对象。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-26',
    title: 'const 声明的对象，其属性不可被修改。',
    categoryId: 'cat-js',
    type: 'judge',
    difficulty: 'easy',
    options: [
      { key: 'T', text: '正确' },
      { key: 'F', text: '错误' }
    ],
    answer: 'F',
    analysis: 'const 锁的是绑定（不能再赋值），对象内容仍可变。真正冻结需 Object.freeze（浅冻结）。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-27',
    title: '下列关于 Promise 的说法，哪一项是正确的？',
    categoryId: 'cat-js',
    type: 'single',
    difficulty: 'medium',
    options: [
      { key: 'A', text: 'Promise.all 中任意一个失败会立即 reject，其余仍会继续但结果被丢弃' },
      { key: 'B', text: 'Promise.all 会等全部结束后才决定成败，失败也返回所有结果' },
      { key: 'C', text: 'Promise.race 会等待最慢的那个' },
      { key: 'D', text: 'then 回调属于宏任务' }
    ],
    answer: 'A',
    analysis: 'all：一个 reject 就失败，其他 Promise 仍会执行完但 all 已失败。allSettled 才等全部结束。race 取最先 settled。then 是微任务。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-28',
    title: '下列哪些会作为微任务执行？',
    categoryId: 'cat-js',
    type: 'multiple',
    difficulty: 'medium',
    options: [
      { key: 'A', text: 'Promise.then' },
      { key: 'B', text: 'queueMicrotask' },
      { key: 'C', text: 'setTimeout' },
      { key: 'D', text: 'MutationObserver 回调' }
    ],
    answer: 'A,B,D',
    analysis: '微任务：Promise.then/catch/finally、queueMicrotask、MutationObserver。setTimeout/setInterval/MessageChannel/I/O 多为宏任务。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-29',
    title: '解释防抖（debounce）与节流（throttle）的区别及适用场景。',
    categoryId: 'cat-js',
    type: 'essay',
    difficulty: 'medium',
    options: [],
    answer: '',
    analysis:
      '防抖：连续触发只在停止后执行一次，适合搜索框、resize 结束再计算。节流：固定间隔最多执行一次，适合滚动监听、拖拽。实现上注意 this、参数、立即执行与取消防抖。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-30',
    title: '简述 JavaScript 中 this 的绑定规则。',
    categoryId: 'cat-js',
    type: 'essay',
    difficulty: 'hard',
    options: [],
    answer: '',
    analysis:
      '默认绑定（严格模式为 undefined）、隐式绑定（obj.fn）、显式绑定（call/apply/bind）、new 绑定、箭头函数继承词法 this。优先级：new > 显式 > 隐式 > 默认。可举事件回调丢失 this 的例子。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-31',
    title: '事件委托（代理）主要利用的是哪一机制？',
    categoryId: 'cat-js',
    type: 'single',
    difficulty: 'easy',
    options: [
      { key: 'A', text: '捕获阶段不能被监听' },
      { key: 'B', text: '事件冒泡，在祖先上统一处理子元素事件' },
      { key: 'C', text: '阻止默认行为' },
      { key: 'D', text: '事件只能绑定一次' }
    ],
    answer: 'B',
    analysis: '把监听挂在父级，靠冒泡用 event.target 判断来源，减少绑定、适配动态节点。注意 stopPropagation 会打断委托。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-32',
    title: '下列哪些是 JavaScript 中的假值（falsy）？',
    categoryId: 'cat-js',
    type: 'multiple',
    difficulty: 'easy',
    options: [
      { key: 'A', text: '0 与 NaN' },
      { key: 'B', text: '空字符串 ""' },
      { key: 'C', text: '空对象 {}' },
      { key: 'D', text: 'null 与 undefined' }
    ],
    answer: 'A,B,D',
    analysis: '假值：false、0、-0、0n、""、null、undefined、NaN。空对象、空数组、"0" 都是真值。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-33',
    title: '比较浅拷贝与深拷贝，并说明常见实现与陷阱。',
    categoryId: 'cat-js',
    type: 'essay',
    difficulty: 'medium',
    options: [],
    answer: '',
    analysis:
      '浅拷贝只复制第一层（Object.assign、展开运算、concat/slice）。深拷贝递归复制，structuredClone 较稳妥；JSON.parse(JSON.stringify) 会丢函数、undefined、循环引用、Date 类型。手写需处理循环引用与特殊对象。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-34',
    title: '在 JavaScript 中，0.1 + 0.2 === 0.3 的结果为 true。',
    categoryId: 'cat-js',
    type: 'judge',
    difficulty: 'easy',
    options: [
      { key: 'T', text: '正确' },
      { key: 'F', text: '错误' }
    ],
    answer: 'F',
    analysis: 'IEEE 754 双精度无法精确表示部分十进制小数。比较可用误差范围，或转整数运算。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-35',
    title: 'React 中列表 key 的主要作用更接近哪一项？',
    categoryId: 'cat-fw',
    type: 'single',
    difficulty: 'easy',
    options: [
      { key: 'A', text: '提高 CSS 优先级' },
      { key: 'B', text: '帮助 Diff 识别节点身份，避免错误复用' },
      { key: 'C', text: '替代 index 作为数组下标' },
      { key: 'D', text: '强制每次都销毁并重建全部子树' }
    ],
    answer: 'B',
    analysis: '稳定唯一的 key 让协调器把更新对应到正确组件。用 index 作 key 在插入/删除时易错位，表单状态会串。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-36',
    title: 'React 的 setState / useState 更新一定是同步刷新 DOM 的。',
    categoryId: 'cat-fw',
    type: 'judge',
    difficulty: 'medium',
    options: [
      { key: 'T', text: '正确' },
      { key: 'F', text: '错误' }
    ],
    answer: 'F',
    analysis: '多数情况下批处理、异步更新。事件里连续 setState 会合并。React 18 自动批处理范围更大。需要最新值应用函数式更新。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-37',
    title: 'Vue 中 computed 与 watch 的典型差异是？',
    categoryId: 'cat-fw',
    type: 'single',
    difficulty: 'medium',
    options: [
      { key: 'A', text: 'computed 适合有返回值的派生数据；watch 适合侦听变化后的副作用' },
      { key: 'B', text: 'watch 有缓存，computed 没有' },
      { key: 'C', text: 'computed 不能依赖响应式数据' },
      { key: 'D', text: '两者完全等价，只是写法不同' }
    ],
    answer: 'A',
    analysis: 'computed 懒计算且有缓存，依赖不变不重算。watch 无返回值要求，适合请求、操作 DOM。能用 computed 就别用 watch 硬算派生值。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-38',
    title: 'React useEffect(() => { ... }) 不传依赖数组时，效果是？',
    categoryId: 'cat-fw',
    type: 'single',
    difficulty: 'medium',
    options: [
      { key: 'A', text: '只在挂载时执行一次' },
      { key: 'B', text: '每次渲染后都执行' },
      { key: 'C', text: '永远不执行' },
      { key: 'D', text: '只在卸载时执行' }
    ],
    answer: 'B',
    analysis: '无依赖：每次 commit 后执行。[]：近似挂载一次（严格模式开发环境会多一次）。有依赖：依赖变化才执行。清理函数在下次 effect 前或卸载时跑。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-39',
    title: '下列哪些属于常见的前端性能优化手段？',
    categoryId: 'cat-fw',
    type: 'multiple',
    difficulty: 'medium',
    options: [
      { key: 'A', text: '路由懒加载与代码分割' },
      { key: 'B', text: '图片懒加载、合适尺寸与现代格式' },
      { key: 'C', text: '把所有资源打进单个超大 bundle 减少请求数即可' },
      { key: 'D', text: '长列表虚拟滚动、避免不必要的重渲染' }
    ],
    answer: 'A,B,D',
    analysis: '体积、请求、缓存、渲染都要权衡。单文件过大不利并行与缓存。还可提 CDN、压缩、Tree Shaking、骨架屏、SSR/流式渲染。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-40',
    title: '你了解哪些前端工程化内容？请举模块化、构建、质量保障各一点。',
    categoryId: 'cat-fw',
    type: 'essay',
    difficulty: 'hard',
    options: [],
    answer: '',
    analysis:
      '模块化：ESM、路径别名。构建：Vite/webpack、拆包、环境变量。质量：ESLint/Prettier、Husky、单测/E2E、CI。协作：Monorepo、约定式路由、设计令牌。结合项目讲清解决了什么问题。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-41',
    title: '简述 Vue/React 中常见的组件通信方式。',
    categoryId: 'cat-fw',
    type: 'essay',
    difficulty: 'medium',
    options: [],
    answer: '',
    analysis:
      '父子：props / emit 或回调。跨层：provide/inject、Context。兄弟：状态提升或共享 store（Pinia/Redux/Zustand）。其它：事件总线慎用。说明何时该用全局状态、何时保持局部即可。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-42',
    title: 'Webpack 的核心打包思路更接近哪一项？',
    categoryId: 'cat-fw',
    type: 'single',
    difficulty: 'easy',
    options: [
      { key: 'A', text: '以入口为起点递归解析依赖图，经 loader/plugin 产出资源' },
      { key: 'B', text: '只打包当前打开的那个文件' },
      { key: 'C', text: '运行时向 CDN 逐文件请求源码并直接 eval' },
      { key: 'D', text: '不处理非 JS 资源' }
    ],
    answer: 'A',
    analysis: '入口 → 依赖图 → loader 转译 → plugin 介入生命周期 → chunk 输出。CSS/图片等也可被模块化。Vite 开发期用 ESM 按需编译，生产仍会打包。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-43',
    title: 'Vue 的 v-if 与 v-show 在实现上没有区别。',
    categoryId: 'cat-fw',
    type: 'judge',
    difficulty: 'easy',
    options: [
      { key: 'T', text: '正确' },
      { key: 'F', text: '错误' }
    ],
    answer: 'F',
    analysis: 'v-if 条件为假时不渲染（销毁/重建），适合很少切换。v-show 用 display 切换，适合频繁切换。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-44',
    title: 'GET 请求适合在 URL 中传递用户密码。',
    categoryId: 'cat-net',
    type: 'judge',
    difficulty: 'easy',
    options: [
      { key: 'T', text: '正确' },
      { key: 'F', text: '错误' }
    ],
    answer: 'F',
    analysis: 'GET 参数出现在 URL、日志、Referer 中，易泄露且有长度限制。敏感信息用 POST/PUT 等放在 body，并走 HTTPS。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-45',
    title: 'HTTP 状态码 304 表示什么？',
    categoryId: 'cat-net',
    type: 'single',
    difficulty: 'easy',
    options: [
      { key: 'A', text: '资源不存在' },
      { key: 'B', text: '协商缓存命中，资源未修改' },
      { key: 'C', text: '服务器内部错误' },
      { key: 'D', text: '需要代理认证' }
    ],
    answer: 'B',
    analysis: '304 Not Modified：ETag / Last-Modified 校验通过，客户端继续用本地缓存。404 不存在，500 服务器错，407 代理认证。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-46',
    title: '下列 HTTP 方法中，通常被认为是幂等的有哪些？',
    categoryId: 'cat-net',
    type: 'multiple',
    difficulty: 'medium',
    options: [
      { key: 'A', text: 'GET' },
      { key: 'B', text: 'PUT' },
      { key: 'C', text: 'DELETE' },
      { key: 'D', text: 'POST' }
    ],
    answer: 'A,B,C',
    analysis: '幂等：同一请求执行多次，资源状态与执行一次相同。GET/PUT/DELETE/HEAD/OPTIONS 通常幂等；POST 一般非幂等（每次新建）。PATCH 视语义而定。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-47',
    title: '前端常见的跨域解决方案有哪些？CORS 的基本流程是什么？',
    categoryId: 'cat-net',
    type: 'essay',
    difficulty: 'medium',
    options: [],
    answer: '',
    analysis:
      '同源：协议+域名+端口。方案：CORS、反向代理、JSONP（仅 GET，已少用）。CORS：简单请求靠响应头 Access-Control-Allow-Origin；非简单请求先 OPTIONS 预检。带 Cookie 需 Access-Control-Allow-Credentials 且 Origin 不能为 *。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-48',
    title: '比较 TCP 与 UDP 的主要差异。',
    categoryId: 'cat-net',
    type: 'essay',
    difficulty: 'medium',
    options: [],
    answer: '',
    analysis:
      'TCP：面向连接、可靠、有序、拥塞/流量控制，开销大，适合网页、文件。UDP：无连接、尽最大努力、可乱序丢包，延迟低，适合直播、DNS、游戏。HTTP/3 基于 QUIC（UDP）仍提供可靠与多路复用。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-49',
    title: 'Cache-Control: no-cache 的含义更接近哪一项？',
    categoryId: 'cat-net',
    type: 'single',
    difficulty: 'medium',
    options: [
      { key: 'A', text: '禁止任何形式的存储' },
      { key: 'B', text: '可以使用缓存，但使用前必须与服务器再验证' },
      { key: 'C', text: '缓存永不过期' },
      { key: 'D', text: '只允许 CDN 缓存，浏览器不能缓存' }
    ],
    answer: 'B',
    analysis: 'no-cache：可存，用前协商。no-store：不落盘。max-age=0 常配合再验证。private / public 控制能否被共享缓存持有。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-50',
    title: '浏览器默认会在跨域 XHR/fetch 中带上 Cookie。',
    categoryId: 'cat-net',
    type: 'judge',
    difficulty: 'medium',
    options: [
      { key: 'T', text: '正确' },
      { key: 'F', text: '错误' }
    ],
    answer: 'F',
    analysis: '跨域 AJAX 默认不带 Cookie。需 credentials: include（或 xhr.withCredentials）且服务端允许凭证。另受 SameSite 约束。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-51',
    title: '下列关于 HTTP 状态码分类，正确的有哪些？',
    categoryId: 'cat-net',
    type: 'multiple',
    difficulty: 'easy',
    options: [
      { key: 'A', text: '2xx 成功' },
      { key: 'B', text: '3xx 重定向' },
      { key: 'C', text: '4xx 客户端错误' },
      { key: 'D', text: '5xx 服务端错误' }
    ],
    answer: 'A,B,C,D',
    analysis: '1xx 信息、2xx 成功、3xx 重定向、4xx 客户端、5xx 服务端。可再举 200/301/302/400/401/403/404/500/502/504。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-52',
    title: '栈（Stack）的存取顺序是先进先出（FIFO）。',
    categoryId: 'cat-algo',
    type: 'judge',
    difficulty: 'easy',
    options: [
      { key: 'T', text: '正确' },
      { key: 'F', text: '错误' }
    ],
    answer: 'F',
    analysis: '栈是 LIFO；队列才是 FIFO。函数调用栈、浏览器历史、括号匹配都用栈。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-53',
    title: '二分查找能够正确工作的前提通常是？',
    categoryId: 'cat-algo',
    type: 'single',
    difficulty: 'easy',
    options: [
      { key: 'A', text: '数据已按关键字有序（或满足单调性）' },
      { key: 'B', text: '数据必须用链表存储' },
      { key: 'C', text: '数据规模必须小于 10' },
      { key: 'D', text: '元素必须全部为正数' }
    ],
    answer: 'A',
    analysis: '二分依赖有序或单调。数组随机访问 O(1) 更合适；链表不适合标准二分。注意边界与溢出（mid = left + (right-left)/2）。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-54',
    title: '下列哪些排序算法是稳定的？',
    categoryId: 'cat-algo',
    type: 'multiple',
    difficulty: 'medium',
    options: [
      { key: 'A', text: '归并排序' },
      { key: 'B', text: '插入排序' },
      { key: 'C', text: '快速排序（常规实现）' },
      { key: 'D', text: '堆排序' }
    ],
    answer: 'A,B',
    analysis: '稳定：相等元素相对顺序不变。归并、插入、冒泡通常稳定；快排、堆排、选择排序通常不稳定。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-55',
    title: '单链表按下标随机访问的时间复杂度是 O(1)。',
    categoryId: 'cat-algo',
    type: 'judge',
    difficulty: 'easy',
    options: [
      { key: 'T', text: '正确' },
      { key: 'F', text: '错误' }
    ],
    answer: 'F',
    analysis: '链表按指针走，访问第 k 个是 O(k)。数组才是 O(1) 随机访问。链表优势在头尾插入删除。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-56',
    title: '哈希冲突的常见解决方式是？',
    categoryId: 'cat-algo',
    type: 'single',
    difficulty: 'medium',
    options: [
      { key: 'A', text: '拉链法（链地址）与开放寻址' },
      { key: 'B', text: '把哈希表改成二叉堆' },
      { key: 'C', text: '禁止再插入任何元素' },
      { key: 'D', text: '只用递归无法解决' }
    ],
    answer: 'A',
    analysis: '拉链：同一槽挂链表/红黑树。开放寻址：线性/二次探测、双重哈希。还需合适负载因子与扩容。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-57',
    title: '什么是时间复杂度与空间复杂度？举例说明。',
    categoryId: 'cat-algo',
    type: 'essay',
    difficulty: 'medium',
    options: [],
    answer: '',
    analysis:
      '用大 O 描述规模 n 增长时资源趋势。时间：赋值、比较等操作次数；空间：额外辅助内存。二分 O(log n)、快排平均 O(n log n)、哈希查找平均 O(1)。面试讲清最好/平均/最坏与是否原地。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-58',
    title: '如何实现 LRU 缓存？复杂度目标是什么？',
    categoryId: 'cat-algo',
    type: 'essay',
    difficulty: 'hard',
    options: [],
    answer: '',
    analysis:
      'HashMap + 双向链表：哈希 O(1) 定位，链表维护新旧顺序，get/put 都 O(1)。访问或写入时把节点移到头部，容量满淘汰尾部。可对比 Map 插入顺序、LFU。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-59',
    title: '二叉树的前序遍历顺序是？',
    categoryId: 'cat-algo',
    type: 'single',
    difficulty: 'medium',
    options: [
      { key: 'A', text: '左 → 根 → 右' },
      { key: 'B', text: '根 → 左 → 右' },
      { key: 'C', text: '左 → 右 → 根' },
      { key: 'D', text: '根 → 右 → 左' }
    ],
    answer: 'B',
    analysis: '前序根左右，中序左根右，后序左右根。BST 中序得到有序序列。可用递归或栈迭代，层序用队列。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-60',
    title: '简述快速排序的基本思想与复杂度。',
    categoryId: 'cat-algo',
    type: 'essay',
    difficulty: 'medium',
    options: [],
    answer: '',
    analysis:
      '选枢轴划分，左小右大，递归两侧。平均 O(n log n)，最坏有序时 O(n²)，可用随机枢轴或三数取中。不稳定，额外空间主要来自递归栈。可对比归并的稳定与 O(n) 额外空间。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-61',
    title: '请做一段约 1 分钟的自我介绍（前端岗位）。',
    categoryId: 'cat-hr',
    type: 'essay',
    difficulty: 'medium',
    options: [],
    answer: '',
    analysis:
      '结构：身份与年限 → 核心技术栈 → 1～2 个能代表你的项目成果（指标）→ 求职方向。避免流水账与堆名词，让面试官知道你能解决哪类问题。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-62',
    title: '谈谈你的优点和缺点。',
    categoryId: 'cat-hr',
    type: 'essay',
    difficulty: 'medium',
    options: [],
    answer: '',
    analysis:
      '优点用项目证据支撑（如主动推进联调、文档化）。缺点选真实且不影响核心能力的，并说明改进动作。避免“完美主义”空话或揭短到无法胜任。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-63',
    title: '为什么考虑新机会 / 为什么离开上一段经历？',
    categoryId: 'cat-hr',
    type: 'essay',
    difficulty: 'medium',
    options: [],
    answer: '',
    analysis:
      '往前看：技术成长、业务复杂度、团队匹配。不贬低前东家，不把责任全推给他人。可提业务方向变化、想做更完整的闭环。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-64',
    title: '当与产品或同事意见不一致时，你通常怎么处理？',
    categoryId: 'cat-hr',
    type: 'essay',
    difficulty: 'hard',
    options: [],
    answer: '',
    analysis:
      '先对齐目标与约束，用数据/成本/风险表达，给出可落地的备选。记录决策，执行时不阳奉阴违。举一次你让步或坚持后被验证的例子。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-65',
    title: '你未来 1～3 年的职业规划是什么？',
    categoryId: 'cat-hr',
    type: 'essay',
    difficulty: 'medium',
    options: [],
    answer: '',
    analysis:
      '短期把当前栈做深（性能、工程化、业务理解），中期能独立负责模块或带人。规划要和岗位相关，避免空泛“当架构师”。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-66',
    title: '你如何看待加班？',
    categoryId: 'cat-hr',
    type: 'essay',
    difficulty: 'medium',
    options: [],
    answer: '',
    analysis:
      '认可阶段性冲刺，同时强调排期、范围与风险前置。可持续交付靠估算与协作，而不是长期透支。结合一次合理加班和一次你推动砍需求的经历更好。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-67',
    title: '讲一次你认为最失败或最有挫败感的项目经历。',
    categoryId: 'cat-hr',
    type: 'essay',
    difficulty: 'hard',
    options: [],
    answer: '',
    analysis:
      '说清背景、你的责任、失败点（估时、沟通、技术选型），以及事后改进。重点是复盘能力，而不是把锅甩干净或过度自责。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-68',
    title: '面试时只背标准答案即可，不必结合自己的项目。',
    categoryId: 'cat-hr',
    type: 'judge',
    difficulty: 'easy',
    options: [
      { key: 'T', text: '正确' },
      { key: 'F', text: '错误' }
    ],
    answer: 'F',
    analysis: '概念要准，但面试更看你怎么用在真实约束里。用项目里的取舍、数据和复盘，比背诵定义更有区分度。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-69',
    title: '你有什么想问面试官的吗？下列哪一类提问通常更合适？',
    categoryId: 'cat-hr',
    type: 'single',
    difficulty: 'easy',
    options: [
      { key: 'A', text: '团队技术栈、业务阶段、该岗位近期要解决的问题' },
      { key: 'B', text: '只问薪资数字，其它一概不问' },
      { key: 'C', text: '质问对方为什么上一轮没当场发 offer' },
      { key: 'D', text: '表示没有任何问题' }
    ],
    answer: 'A',
    analysis: '好问题体现你在评估匹配度。薪酬可在合适轮次谈。完全不问显得准备不足。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  },
  {
    id: 'q-70',
    title: 'flex 布局中，下列哪些属性作用在容器上？',
    categoryId: 'cat-fe',
    type: 'multiple',
    difficulty: 'medium',
    options: [
      { key: 'A', text: 'justify-content' },
      { key: 'B', text: 'align-items' },
      { key: 'C', text: 'flex-grow' },
      { key: 'D', text: 'flex-direction' }
    ],
    answer: 'A,B,D',
    analysis: '容器：flex-direction、justify-content、align-items、flex-wrap、align-content、gap。项目：flex-grow/shrink/basis、align-self、order。',
    enabled: true,
    createdAt: 1710000000000,
    updatedAt: 1710000000000
  }
];
