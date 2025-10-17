---
layout: home
---

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vitepress'

const router = useRouter()

onMounted(() => {
  // 重定向到英文版本
  router.go('/apps/take-a-break/index.en')
})
</script>

<div style="text-align: center; padding: 50px;">
  <p>Redirecting to English version...</p>
  <p>正在跳转到英文版本...</p>
  <p>If not redirected, <a href="/apps/take-a-break/index.en">click here</a>.</p>
</div>
