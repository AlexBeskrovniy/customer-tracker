import { useRef } from 'react';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase';

import './CustomerCard.scss';
import Icon from '../Icons/Icon';

type CustomerCardProps = {
    record: CustomerDoc
}

const CustomerCard = ({ record }: CustomerCardProps) => {
    const checkBoxRef = useRef<HTMLInputElement | null>(null);

    const deleteRecord = (record: CustomerDoc) => {
        confirm(`This action will delete the "${record.customer}" record. Are you sure?`) &&
        deleteDoc(doc(db, "customers", record.id));
    }

    const handleComplete = (record: CustomerDoc) => {
        if (checkBoxRef.current !== null) {
            checkBoxRef.current.checked = !checkBoxRef.current?.checked;
        }
        const docRef = doc(db, "customers", record.id);
        updateDoc(docRef, {
            isCompleted: checkBoxRef.current?.checked
        })
    }

    return (
        <div className='customer-card'>
            <div className='customer-card-header'>
                <div className='customer-card-header-name'>
                    {record.customer}
                </div>
                <div className='customer-card-header-price'>
                    {record.price ? record.price : '---'}
                </div>
            </div>
            <div className='customer-card-notes'>
                {record.notes ? record.notes : 'No notes'}
            </div>
            <div className='customer-card-footer'>
                <div className='customer-card-check-button' onClick={() => handleComplete(record)}>
                    <input type="checkbox" ref={checkBoxRef} defaultChecked={record.isCompleted} hidden />
                    {record.isCompleted &&
                        <Icon id={"#check"} />
                    }
                </div>
                <div className='customer-card-delete-button' onClick={() => deleteRecord(record)}>
                    <Icon id={"#trash-bin"} />
                </div>
            </div>
        </div>
    );
}

export default CustomerCard;