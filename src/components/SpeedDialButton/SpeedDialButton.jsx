import React, { useState } from 'react';
import { SpeedDial } from 'primereact/speeddial';
import { Dialog } from 'primereact/dialog';
import "./SpeedDialButton.css"

export const SpeedDialButton = ({ products }) => {
  const [visible, setVisible] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);

  const openModal = () => {
    setVisible(true);
  };

  const closeDialog = () => {
    setVisible(false);
  };

  const handleActionClick = (action) => {
    setSelectedAction(action);
    openModal();
  };

  const actionItems = [
    { icon: 'pi pi-pencil', command: () => handleActionClick('Edit') },
    { icon: 'pi pi-cart-plus', command: () => handleActionClick('Add to Cart') },
    { icon: 'pi pi-trash', command: () => handleActionClick('Delete') }
  ];

  return (
    <div>
      <SpeedDial model={actionItems} visible={visible} />
      {selectedAction && (
        <Dialog
          header={`Performing: ${selectedAction}`}
          visible={visible}
          style={{ width: '50vw' }}
          onHide={closeDialog}
        >
          
          <div className="action-details">
            {selectedAction === 'Edit' && <p>Edit Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit porro odio minima corrupti reprehenderit similique ut voluptatem ratione quasi laudantium quibusdam architecto vitae impedit, saepe illum obcaecati aspernatur ipsa deleniti. <input /> </p>}
            {selectedAction === 'Add to Cart' && <p>Add Lorem ipsum dolor sit amet consectetur adipisicing elit. Id quibusdam voluptatem atque nesciunt perspiciatis ipsam animi inventore temporibus, fugiat reprehenderit dignissimos autem doloribus praesentium explicabo earum eos deserunt quae ex?</p>}
            {selectedAction === 'Delete' && <p>Delete Lorem ipsum dolor sit amet consectetur adipisicing elit. Et assumenda tempora fuga maxime animi consequatur deserunt sed praesentium harum corrupti doloremque quam, rerum aspernatur aut? Fuga voluptatem aut exercitationem magnam.</p>}
          </div>
        </Dialog>
      )}
    </div>
  );
};
