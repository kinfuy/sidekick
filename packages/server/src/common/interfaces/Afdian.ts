export interface Root {
    ec: number
    em: string
    data: Data
  }
  
  export interface Data {
    type: string
    order: Order
  }
  
  export interface Order {
    out_trade_no: string
    custom_order_id: string
    user_id: string
    user_private_id: string
    plan_id: string
    month: number
    total_amount: string
    show_amount: string
    status: number
    remark: string
    redeem_id: string
    product_type: number
    discount: string
    sku_detail: SkuDetail[]
    address_person: string
    address_phone: string
    address_address: string
  }
  
  export interface SkuDetail {
    sku_id: string
    count: number
    name: string
    album_id: string
    pic: string
  }
