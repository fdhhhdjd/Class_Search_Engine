## 1: Search Theo Từ khóa:

```javascript
const result1 = await index.search('your_keyword');
```

## 2: Tìm Kiếm Theo Mô Hình Phân Cấp (Faceting):

```javascript
const result2 = await index.search('your_keyword', {
    facets: ['category', 'price', 'brand'],
});
```

## 3: Tìm Kiếm Theo Dải Giá:

```javascript
const result3 = await index.search('', {
    filters: 'price:[min_price TO max_price]',
});
```

## 4: Tìm Kiếm Gần Đúng (Fuzzy Search):

```javascript
const result4 = await index.search('your_keyword~');
```

## 5: Tìm Kiếm Theo Vị Trí (Geolocation):

```javascript
const result5 = await index.search('', {
    aroundLatLng: 'lat,lng',
    aroundRadius: 10000, // Đơn vị tính mét
});
```

## 6: Tìm Kiếm Theo Ngày:

```javascript
const result5 = await index.search('', {
    aroundLatLng: 'lat,lng',
    aroundRadius: 10000, // Đơn vị tính mét
});
```

## 7: Tìm Kiếm Theo Danh Mục:

```javascript
const result7 = await index.search('your_keyword', {
    filters: 'category:electronics',
});
```

## 8: Tìm Kiếm Theo Nhiều Từ Khóa (AND):

```javascript
const result8 = await index.search('keyword1 AND keyword2');
```

## 9: Tìm Kiếm Theo Từ Khóa Phổ Biến:

```javascript
const result9 = await index.search('popular_keywords');
```

## 10: Tìm Kiếm Đa Truy Vấn (Boolean Query):

```javascript
const result10 = await index.search('keyword1 AND (keyword2 OR keyword3) NOT keyword4');
```

## 11: Sắp Xếp Kết Quả:

```javascript
const result = await index.search('search_query', {
    facets: ['category', 'brand', 'price'],
    sortBy: ['relevance', 'price:asc'],
});
```

## 12: Phân Trang Kết Quả:

```javascript
const result = await index.search('search_query', {
    facets: ['category', 'brand', 'price'],
    hitsPerPage: 10,
    page: 1,
});
```

## 13: Tìm Kiếm Đa Nguồn:

```javascript
const result = await searchClient.multipleQueries([
    {
        indexName: 'index1',
        query: 'search_query',
    },
    {
        indexName: 'index2',
        query: 'search_query',
    },
]);
```

## 14: Gợi Ý Tìm Kiếm (Autocomplete):

```javascript
const result = await index.search('partial_query', {
    facets: ['category', 'brand', 'price'],
    hitsPerPage: 5,
});
```

## 15: Lấy những trường cần

```javascript
const result = await index.search('search_query', {
    facets: ['category', 'brand', 'price'],
    attributesToRetrieve: ['make', 'model', 'image', 'description'],
    hitsPerPage: 10,
});

// Kết quả sẽ chỉ chứa các trường được chỉ định trong attributesToRetrieve
console.log(result.hits);
```

## 16: Tìm kiếm nhiều option v1

```javascript
const searchQuery = {
    query: 'your_search_term', // Từ khóa tìm kiếm
    attributesToHighlight: ['name', 'description'], // Nổi bật các trường
    attributesToSnippet: ['content:10'], // Hiển thị đoạn văn bản snippet
    facetFilters: [['category:Electronics', 'brand:Samsung']], // Bộ lọc động
    aroundLatLng: '37.7749, -122.4194', // Tìm kiếm xung quanh vị trí
    aroundRadius: 10000, // Bán kính tìm kiếm xung quanh
    numericFilters: ['price >= 50', 'price <= 100'], // Bộ lọc số học
    queryType: 'prefixLast', // Loại truy vấn
    typoTolerance: 'min', // Chấp nhận ít lỗi chính tả hơn
};

index
    .search(searchQuery)
    .then(({ hits }) => {
        console.log('Result', hits);
    })
    .catch((err) => {
        console.error('Error:', err);
    });
```

## 17: Tìm kiếm nhiều option v2

```javascript
const searchQuery = {
    // Chỉ lấy các trường cần thiết từ kết quả tìm kiếm
    attributesToRetrieve: ['name', 'price', 'image'],

    // Chỉ trả về một số lượng kết quả cụ thể
    hitsPerPage: 10,

    // Sắp xếp kết quả theo giá giảm dần
    sortBy: ['price:desc'],

    // Đánh dấu các từ khóa trong trường mô tả
    highlightPreTag: '<strong>',
    highlightPostTag: '</strong>',

    // Chỉ tìm kiếm trong một số trường cụ thể
    restrictSearchableAttributes: ['name', 'description'],

    // Tùy chọn tìm kiếm thông minh
    enableABTest: true,
    ruleContexts: ['mobile'],

    // Chỉ trả về các kết quả có chất lượng cao (Relevance Score >= 50)
    minRelevanceScore: 50,
};

index
    .search(searchQuery)
    .then(({ hits }) => {
        console.log('Kết quả tìm kiếm:', hits);
    })
    .catch((err) => {
        console.error('Lỗi tìm kiếm:', err);
    });
```
