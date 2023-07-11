import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase';

import './CustomerCard.scss';
import Icon from '../Icons/Icon';

type CustomerCardProps = {
    record: CustomerDoc
}

const CustomerCard = ({ record }: CustomerCardProps) => {
    const deleteRecord = (record: CustomerDoc) => {
          confirm(`This action will delete the "${record.customer}" record. Are you sure?`) &&
          deleteDoc(doc(db, "customers", record.id));
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
                <div className='customer-card-check-button'>
                    <Icon id={"#check"}/>
                </div>
                <div className='customer-card-delete-button' onClick={() => deleteRecord(record)}>
                    <Icon id={"#trash-bin"} />
                </div>
            </div>
        </div>
    );
}

export default CustomerCard;