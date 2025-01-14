import React, { useEffect } from 'react'

const BasicModal = ({ title, body, user }) => {

  useEffect(() => {
    console.log(user)
  })
  return (
    <div className="modal" tabindex="-1" id='exampleModal'>
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                {body}
            </div>
            <div className="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                {
                    user !== undefined ? (
                        <button type="button" class="btn btn-primary">Save changes</button>
                    ) : (
                        null
                    )
                }
            </div>
            </div>
        </div>
    </div>
  )
}

export default BasicModal