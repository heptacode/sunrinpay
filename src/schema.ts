export interface StockItem {
	name: string; // 상품의 이름
	barcode: string; // 바코드 문자열
	count: number; // 재고
	price: number; // 가격
	tag?: string[]; // 상품 태그
}
