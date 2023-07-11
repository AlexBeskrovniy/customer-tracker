interface CustomerDoc {
    id: string,
    date: string,
    customer: string,
    price?: string,
    notes?: string,
    isCompleted?: boolean,
    uid?: string
}

type CustomerDocs = CustomerDoc[] | [];