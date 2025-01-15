<template>
  <div class="quick-panel">
    <div class="rule-form">
      <!-- API匹配规则 -->
      <div class="form-row">
        <input
          v-model="newRule.match.value"
          placeholder="API 匹配模式 (例如: /api/users/*)"
          class="input-match"
        />
        <select v-model="newRule.match.matchType" class="select-match-type">
          <option value="contains">包含</option>
          <option value="equals">完全匹配</option>
          <option value="regex">正则匹配</option>
        </select>
      </div>

      <!-- 规则类型和响应设置 -->
      <div class="form-row">
        <select v-model="ruleType" class="select-rule-type">
          <option value="mock">Mock数据</option>
          <option value="redirect">重定向</option>
        </select>

        <template v-if="ruleType === 'redirect'">
          <input
            v-model="redirectUrl"
            placeholder="重定向地址"
            class="input-redirect"
          />
        </template>
        <template v-else>
          <div class="mock-editor">
            <!-- <MonacoEditor
              v-model="mockResponse"
              language="json"
              :options="editorOptions"
              @change="validateJson"
            /> -->
            <div v-if="jsonError" class="error-message">
              {{ jsonError }}
            </div>
          </div>
        </template>
      </div>

      <button class="btn-primary" :disabled="!isValid" @click="addRule">
        添加规则
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useApiProxyStore } from '../../../../store';
import type { MatchType, ProxyRule } from '../../../../store';
// import MonacoEditor from '@/components/monaco-editor.vue';

interface NewRule extends Omit<ProxyRule, 'id'> {
  match: {
    matchType: MatchType;
    value: string;
  };
  redirect?: {
    url: string;
  };
  response?: {
    body: unknown;
  };
}

// 初始规则模板
const initialRule: NewRule = {
  priority: 1,
  match: {
    matchType: 'contains',
    value: '',
  },
};

const store = useApiProxyStore();
const ruleType = ref<'mock' | 'redirect'>('mock');
const mockResponse = ref('{\n  \n}');
const jsonError = ref('');
const newRule = ref<NewRule>({ ...initialRule });
const redirectUrl = ref('');

// Monaco编辑器配置
const editorOptions = {
  minimap: { enabled: false },
  lineNumbers: 'on',
  scrollBeyondLastLine: false,
  automaticLayout: true,
  fontSize: 12,
  tabSize: 2,
  height: 200,
} as const;

// 验证JSON格式
const validateJson = (value: string) => {
  try {
    if (value.trim()) {
      JSON.parse(value);
      jsonError.value = '';
    }
  } catch (e) {
    jsonError.value = (e as Error).message;
  }
};

// 监听规则类型变化
watch(ruleType, (newType) => {
  if (newType === 'mock') {
    delete newRule.value.redirect;
  } else {
    delete newRule.value.response;
    newRule.value.redirect = { url: redirectUrl.value };
  }
});

// 监听重定向URL变化
watch(redirectUrl, (url) => {
  if (ruleType.value === 'redirect') {
    newRule.value.redirect = { url };
  }
});

// 表单验证
const isValid = computed(() => {
  if (!newRule.value.match.value) return false;

  if (ruleType.value === 'redirect') {
    return Boolean(redirectUrl.value);
  }
  return !jsonError.value && mockResponse.value.trim() !== '';
});

// 重置表单
const resetForm = () => {
  newRule.value = { ...initialRule };
  mockResponse.value = '{\n  \n}';
  jsonError.value = '';
  redirectUrl.value = '';
};

// 添加规则
const addRule = () => {
  if (!isValid.value) return;

  const rule: ProxyRule = {
    ...newRule.value,
    id: Date.now().toString(),
  };

  if (ruleType.value === 'mock') {
    try {
      rule.response = {
        body: JSON.parse(mockResponse.value),
      };
      delete rule.redirect;
    } catch (e) {
      return;
    }
  } else {
    rule.redirect = { url: redirectUrl.value };
    delete rule.response;
  }

  //   store.addRule(rule);
  resetForm();
};
</script>

<style scoped lang="less">
.quick-panel {
  background: white;
  border-radius: 0 0 8px 8px;
  padding: 16px;
}

.rule-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-row {
  display: flex;
  gap: 8px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
}

.input-match,
.input-redirect,
.select-match-type,
.select-rule-type {
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s;
  background-color: #f9fafb;
  color: #374151;

  &::placeholder {
    color: #9ca3af;
  }

  &:hover {
    border-color: #d1d5db;
    background-color: #ffffff;
  }

  &:focus {
    border-color: #3b82f6;
    background-color: #ffffff;
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
}

.input-match {
  flex: 2;
}

.select-match-type,
.select-rule-type {
  flex: 1;
  cursor: pointer;
  padding-right: 32px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 16px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &:hover {
    background-color: #f3f4f6;
  }
}

.mock-editor {
  flex: 1;
  min-height: 200px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  overflow: hidden;
}

.error-message {
  color: #dc2626;
  font-size: 12px;
  margin-top: 4px;
}

.btn-primary {
  background: linear-gradient(to bottom right, #4f46e5, #3b82f6);
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  font-size: 14px;

  &:hover:not(:disabled) {
    background: linear-gradient(to bottom right, #4338ca, #2563eb);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
