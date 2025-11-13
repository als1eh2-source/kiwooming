FROM node:20

WORKDIR /app

ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL}

# 패키지 설치
COPY package*.json ./
RUN npm install

# 전체 복사
COPY . .

# CRA는 .env.production 파일만 읽는다
# Dockerfile ENV/ARG는 전부 무시됨

RUN npm run build

RUN npm install -g serve

EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
