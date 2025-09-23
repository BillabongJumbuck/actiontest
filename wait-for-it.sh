#!/bin/bash
# wait-for-it.sh

# 要检查的目标 URL
TARGET_URL="http://localhost:8080/api/user"
TIMEOUT=60
SLEEP_INTERVAL=2

echo "正在等待 API 在 ${TARGET_URL} 上可用..."

for i in $(seq 1 $TIMEOUT); do
  # curl -s 静默执行，不显示进度或错误
  curl -s "${TARGET_URL}" > /dev/null
  # 检查上一个命令的退出代码
  if [ $? -eq 0 ]; then
    echo "API 已启动并运行！"
    exit 0
  fi
  sleep $SLEEP_INTERVAL
done

echo "API 在超时时间内未能启动。"
exit 1