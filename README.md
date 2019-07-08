# Gorilla

## Setup

Install dependencies

```sh
$ yarn install (or npm install)
```

## Test & TODO

```sh
$ yarn test (or npm test)
```

- Fail되고 있는 테스트들을 하나씩 통과시켜주시면 됩니다.
- `GorillaError` -> `lifecycleEventsMixin` -> `Component`의 순서로 진행하시면 좋을것 같습니다.
- Test를 성공적으로 모두 완성시켰다면, `app/index.js`의 내용이 모두 정상적으로 실행되어야 합니다. (이벤트 처리, 컴포넌트 lifecycle hooks, 컴포넌트 data update 등)

## Objectives

- `import`, `export` statement를 처음 보셨다면, 조사해보시기 바랍니다.
- 전반적인 코드베이스의 구조나 역할에 대해 인지를 하며 OOP, Mixin등의 디자인 패턴이 어떤 방식으로 적용되는지 살펴보시기 바랍니다.
