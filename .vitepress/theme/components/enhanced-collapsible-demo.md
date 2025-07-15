# 增强版可折叠代码块演示

本页面演示了如何使用简化版的 `EnhancedCollapsibleCodeBlock` 组件。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("MyToken", "MTK") {
        _mint(msg.sender, initialSupply);
    }

    function decimals() public pure override returns (uint8) {
        return 6;
    }
}
```

## 基本使用
```javascript
// 这是一个基本的 JavaScript 示例
const greeting = "Hello, World!";

function sayHello(name) {
  return `Hello, ${name}!`;
}

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  introduce() {
    return `My name is ${this.name} and I'm ${this.age} years old.`;
  }
}

const person = new Person("Alice", 30);
console.log(person.introduce());
```
<EnhancedCollapsibleCodeBlock 
  title="基本示例 - JavaScript 代码"
  language="javascript"
  :show-language-label="false"
  :default-expanded="false"
>

```javascript
// 这是一个基本的 JavaScript 示例
const greeting = "Hello, World!";

function sayHello(name) {
  return `Hello, ${name}!`;
}

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  introduce() {
    return `My name is ${this.name} and I'm ${this.age} years old.`;
  }
}

const person = new Person("Alice", 30);
console.log(person.introduce());
```

</EnhancedCollapsibleCodeBlock>

## 带复制按钮的示例

<EnhancedCollapsibleCodeBlock 
  title="Solidity 智能合约 - ERC20 Token"
  language="solidity"
  :show-copy-button="true"
  :show-language-label="true"
  :default-expanded="false"
>

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("MyToken", "MTK") {
        _mint(msg.sender, initialSupply);
    }

    function decimals() public pure override returns (uint8) {
        return 6;
    }
}
```

</EnhancedCollapsibleCodeBlock>

## 多语言示例

<EnhancedCollapsibleCodeBlock 
  title="Python 脚本示例"
  language="python"
  :show-copy-button="true"
  :show-language-label="true"
  :default-expanded="true"
>

```python
# Python 示例
from datetime import datetime

class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email
        self.created_at = datetime.now()
    
    def get_info(self):
        return {
            'name': self.name,
            'email': self.email,
            'created_at': self.created_at.isoformat()
        }

# 使用示例
user = User("张三", "zhangsan@example.com")
print(user.get_info())
```

</EnhancedCollapsibleCodeBlock>

## 配置文件示例

<EnhancedCollapsibleCodeBlock 
  title="Docker Compose 配置"
  language="yaml"
  :show-language-label="true"
  :default-expanded="false"
>

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - db
  
  db:
    image: postgres:13
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

</EnhancedCollapsibleCodeBlock>

## 组件属性说明

### 可用属性

- `title` (必需): 代码块的标题
- `language` (可选): 代码块的语言类型，用于语言标签显示
- `show-copy-button` (可选): 是否显示复制按钮，默认为 false
- `show-language-label` (可选): 是否显示语言标签，默认为 true
- `default-expanded` (可选): 是否默认展开，默认为 false

### 事件回调

- `@toggle`: 折叠状态变化时触发
- `@copy`: 复制操作时触发

### 使用示例

```vue
<!-- 基本使用 -->
<EnhancedCollapsibleCodeBlock 
  title="示例代码"
  language="javascript"
>
  <!-- 代码块内容 -->
</EnhancedCollapsibleCodeBlock>

<!-- 带复制按钮和默认展开 -->
<EnhancedCollapsibleCodeBlock 
  title="重要代码"
  language="solidity"
  :show-copy-button="true"
  :default-expanded="true"
>
  <!-- 代码块内容 -->
</EnhancedCollapsibleCodeBlock>
```

这个简化版组件保持了核心功能，使用简单，性能更好！ 
