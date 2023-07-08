interface CustomerDoc {
    id: string,
    date: string,
    customer: string,
    price?: string,
    notes?: string,
    uid?: string
}

type CustomerDocs = CustomerDoc[] | [];