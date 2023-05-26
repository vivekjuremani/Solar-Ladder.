import { FaStoreAlt } from 'react-icons/fa';
import { MdStorefront } from 'react-icons/md';
import { RiBankFill } from 'react-icons/ri';
import styled from 'styled-components';
function Books() {
  return (
    <Wrapper className='mt-3'>
      <div className='ms-3 text-uppercase mb-3'>
        <h2>Books</h2>
      </div>
      <div className='container text-center'>
        <div className='row'>
          <div className='col'>
            <div className='d-flex justify-content-center'>
              <div className='text-capitalize fs-6 text-black fw-semibold pb-3 lh-1 book_store p-2'>
                <span className='me-1 fs-4'>
                  <FaStoreAlt />
                </span>{' '}
                Inventory
              </div>
            </div>
          </div>
          <div className='col-8'>
            <div className='d-flex justify-content-center'>
              <div className='text-capitalize fs-6 text-black fw-semibold pb-3 lh-1 book_store p-2'>
                <span className='me-1 fs-4'>
                  <MdStorefront />
                </span>{' '}
                items
              </div>
            </div>
          </div>
          <div className='col'>
            <div className='d-flex justify-content-center'>
              <div className='text-capitalize fs-6 text-black fw-semibold pb-3 lh-1 book_store p-2'>
                <span className='me-1 fs-4'>
                  <RiBankFill />
                </span>{' '}
                expenses
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Books;
const Wrapper = styled.main`
  .book_store {
    width: 130px;
  }
  .book_store:hover {
    border-bottom: 4px solid blue;
    color: blue !important;
    cursor: pointer;
  }
`;
