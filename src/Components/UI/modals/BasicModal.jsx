import React from 'react'

const BasicModal = ({ title, body, modalId }) => {

  return (
    <div className="modal" tabindex="-1" id={modalId}>
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                {body}
            </div>
            </div>
        </div>
    </div>
  )
}

export default BasicModal