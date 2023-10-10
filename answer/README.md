# Part.7) UX 개선을 위한 효율적인 비동기 데이터의 관리

# 목적

기능 요구사항 문서를 기반으로 프로덕트를 구현하다.

의도된 늦은 반응 속도 API 를 기반으로 한 UX 개선을 적용한다

## 사용하는 기술 set

- Skeleton component 라이브러리를 이용해서 구현 (택1)
  - **Material UI Skeleton Component**
  - ~~react-loading-skeleton~~
  - ~~react-content-loader~~
- React-query를 이용한 prefetching 적용
- 다음의 데이터를 분할하는 렌더링 방식 (택 1)
  - Pagination 을 이용한 데이터 rendering
    - styling은 실습에서 보여주었던 bootstrap 코드를 활용하거나 MUI를 이용
  - infinite scroll  을 이용한 데이터 rendering
    - intersection oberserver API 이용 하거나 scroll event 기반으로 구현

# 요구사항

- product list의 첫번쨰 페이지 로드는 prefetching 하여 SSR로 렌더링 하도록 합니다.
- product list는 **Infinite Scroll / Pagination** (택1) 하여 진행하도록 합니다.
- 두번쨰 페이지, 혹은 infinite scroll로 로딩할 경우에는 CSR로 로드를 진행하게 됩니다.
- react-query를 활용하여 fetching에 필요한 여러가지 도움을 받아서 진행합니다.
  - isLoading 처리
  - prefetching
  - caching
- product list 의 DB 업데이트 주기는 24시간 입니다. 이를 토대로 stale time, cache time설정을 진행해보도록 합니다.
- (Pagination의 경우) 캐싱을 활용하여 이전 페이지 데이터를 받아올 경우에는 API 호출이 없도록 진행합니다.
- 스켈레톤은 강의 중 사용했던 스켈레톤 컴포넌트 구성 라이브러리를 이용합니다.
  - product list item에 figma 타입 정의는 없습니다. 직접 구성해보시면서 진행해보도록 합니다.
- (선택) Persist Cache를 사용하여서 구현해봐도 좋습니다. API 호출이 최초에만 존재하는지, storage에 해당 캐시가 존재하는지 확인해보시면서 구현을 해봐도 좋습니다.

### Types

```
export type ProductRating = {
    rate: number
    count: number
}
export type Product = {
    id: number
    title: string
    price: number
    image: string
    description: string
    rating: ProductRating
}
```

### API

- url: `/api/products`
- params
  - `page` 현재 페이지 숫자 (0 부터 존재)
- 사용 예

    ```
    fetch('/api/products?page=1') // 페이지 1의 데이터 반환
    ```

- Request

    ```
    queryParam
     page: number
    ```

- Response

    ```
    interface Response {
     products: Array<Product>
     pageCount: number // page의 최대 숫자
    }
    ```

- API는 의도적으로 1초 딜레이를 주어서 return 하도록 하였습니다. 개발중에 빠르게 처리하고자 할 경우에는 delay를 주석으로 막아주시면 됩니다.
  - 스켈레톤 로딩 및 캐싱/프리피칭의 효과를 제대로 보기 위해서
