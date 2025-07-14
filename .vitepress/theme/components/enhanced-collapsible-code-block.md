# EnhancedCollapsibleCodeBlock 组件使用文档

## 简介

`EnhancedCollapsibleCodeBlock` 是一个功能强大的可折叠代码块组件，提供了美观的代码展示、复制功能、语言标签等特性。

## 特性

- ✅ **可折叠展开**：点击标题栏可以折叠/展开代码内容
- ✅ **代码复制**：支持一键复制所有代码内容
- ✅ **语言标签**：支持显示编程语言标签
- ✅ **多语言主题**：为不同编程语言提供专属主题色
- ✅ **响应式设计**：适配各种屏幕尺寸
- ✅ **暗色模式**：完美支持暗色主题
- ✅ **动画效果**：流畅的展开/折叠动画

## 基本用法

### 最简用法

```vue
<template>
  <EnhancedCollapsibleCodeBlock title="JavaScript 示例">
    <div v-pre>
      ```javascript
      function hello() {
        console.log("Hello, World!");
      }
      ```
    </div>
  </EnhancedCollapsibleCodeBlock>
</template>
```

### 带复制按钮

```vue
<template>
  <EnhancedCollapsibleCodeBlock 
    title="可复制的代码块"
    :show-copy-button="true"
  >
    <div v-pre>
      ```javascript
      const data = { name: "John", age: 30 };
      console.log(data);
      ```
    </div>
  </EnhancedCollapsibleCodeBlock>
</template>
```

### 显示语言标签

```vue
<template>
  <EnhancedCollapsibleCodeBlock 
    title="TypeScript 代码"
    language="typescript"
    :show-language-label="true"
    :show-copy-button="true"
  >
    <div v-pre>
      ```typescript
      interface User {
        name: string;
        age: number;
      }
      
      const user: User = { name: "Alice", age: 25 };
      ```
    </div>
  </EnhancedCollapsibleCodeBlock>
</template>
```

### 默认展开

```vue
<template>
  <EnhancedCollapsibleCodeBlock 
    title="默认展开的代码块"
    :default-expanded="true"
    :show-copy-button="true"
  >
    <div v-pre>
      ```python
      def greet(name):
          return f"Hello, {name}!"
      
      print(greet("World"))
      ```
    </div>
  </EnhancedCollapsibleCodeBlock>
</template>
```

## 属性配置

| 属性名              | 类型       | 默认值  | 描述               |
| ------------------- | ---------- | ------- | ------------------ |
| `title`             | `string`   | -       | 代码块标题（必需） |
| `language`          | `string`   | `''`    | 编程语言类型       |
| `showCopyButton`    | `boolean`  | `false` | 是否显示复制按钮   |
| `showLanguageLabel` | `boolean`  | `false` | 是否显示语言标签   |
| `defaultExpanded`   | `boolean`  | `false` | 是否默认展开       |
| `onToggle`          | `function` | -       | 展开/折叠回调函数  |
| `onCopy`            | `function` | -       | 复制操作回调函数   |

## 支持的编程语言

组件为以下编程语言提供专属主题色：

| 语言       | 标识符       | 主题色         |
| ---------- | ------------ | -------------- |
| JavaScript | `javascript` | 黄色 (#f7df1e) |
| TypeScript | `typescript` | 蓝色 (#3178c6) |
| Solidity   | `solidity`   | 灰色 (#363636) |
| Python     | `python`     | 蓝色 (#3776ab) |
| Rust       | `rust`       | 橙色 (#ce422b) |
| Go         | `go`         | 青色 (#00add8) |
| Shell      | `shell`      | 绿色 (#4EAA25) |
| JSON       | `json`       | 黑色 (#000)    |
| YAML       | `yaml`       | 红色 (#CB171E) |
| Dockerfile | `dockerfile` | 蓝色 (#2496ED) |

## 完整示例

```vue
<template>
  <div>
    <!-- Solidity 智能合约示例 -->
    <EnhancedCollapsibleCodeBlock 
      title="智能合约部署代码"
      language="solidity"
      :show-copy-button="true"
      :show-language-label="true"
      :on-toggle="handleToggle"
      :on-copy="handleCopy"
    >
      <div v-pre>
        ```solidity
        pragma solidity ^0.8.0;
        
        contract SimpleStorage {
            uint256 private storedData;
            
            function set(uint256 x) public {
                storedData = x;
            }
            
            function get() public view returns (uint256) {
                return storedData;
            }
        }
        ```
      </div>
    </EnhancedCollapsibleCodeBlock>

    <!-- Python 脚本示例 -->
    <EnhancedCollapsibleCodeBlock 
      title="Python 数据处理"
      language="python"
      :show-copy-button="true"
      :show-language-label="true"
      :default-expanded="true"
    >
      <div v-pre>
        ```python
        import pandas as pd
        import numpy as np
        
        # 创建数据
        data = {
            'name': ['Alice', 'Bob', 'Charlie'],
            'age': [25, 30, 35],
            'salary': [50000, 60000, 70000]
        }
        
        df = pd.DataFrame(data)
        print(df.describe())
        ```
      </div>
    </EnhancedCollapsibleCodeBlock>
  </div>
</template>

<script setup lang="ts">
const handleToggle = (isExpanded: boolean) => {
  console.log('代码块展开状态:', isExpanded);
};

const handleCopy = (success: boolean) => {
  if (success) {
    console.log('代码复制成功');
  } else {
    console.log('代码复制失败');
  }
};
</script>
```

## 样式自定义

组件使用 CSS 变量，支持通过 VitePress 主题进行样式自定义：

```css
:root {
  --vp-c-bg: #ffffff;
  --vp-c-bg-soft: #f9f9f9;
  --vp-c-bg-mute: #f1f1f1;
  --vp-c-divider: #e2e2e3;
  --vp-c-text-1: #213547;
  --vp-c-text-2: #476582;
  --vp-c-brand: #646cff;
  --vp-code-block-bg: #f6f8fa;
}
```

## 注意事项

1. **内容包装**：代码内容需要使用 `<div v-pre>` 包装，以避免 Vue 模板解析
2. **语言标识**：设置 `language` 属性可以获得更好的语言标签主题色
3. **响应式**：组件在移动设备上会自动调整样式
4. **无障碍**：支持键盘焦点和屏幕阅读器
5. **性能**：大量代码块时建议使用 `v-show` 或懒加载

## 常见问题

### Q: 代码块无法正确渲染？
A: 确保代码内容使用 `<div v-pre>` 包装，并且 Markdown 代码块语法正确。

### Q: 复制功能不工作？
A: 复制功能需要 HTTPS 环境或 localhost，并且浏览器需要支持 `navigator.clipboard` API。

### Q: 如何添加自定义语言主题？
A: 可以通过 CSS 覆盖对应的语言样式类，例如：
```css
.language-mylang .language-label {
  background: #custom-color;
  color: #ffffff;
}
```

## 更新日志

- **v1.0.0**：初始版本，支持基本的折叠展开功能
- **v1.1.0**：添加复制功能和语言标签
- **v1.2.0**：添加多语言主题色支持
- **v1.3.0**：优化响应式设计和暗色模式支持 
