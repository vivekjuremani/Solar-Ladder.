import { MdViewCarousel } from 'react-icons/md';
import { VscTasklist } from 'react-icons/vsc';
import { TbArrowForward } from 'react-icons/tb';
import { HiCurrencyDollar } from 'react-icons/hi';
import { AiOutlineStock } from 'react-icons/ai';
import { MdPayment } from 'react-icons/md';
import { MdPieChart } from 'react-icons/md';
import { AiFillBook } from 'react-icons/ai';
import { IoMdSettings } from 'react-icons/io';
import { MdFiberNew } from 'react-icons/md';
import styled from 'styled-components';
function Tabs() {
  return (
    <Wrapper className='me-4 d-flex flex-row justify-content-center'>
      <div className='me-4 d-flex align-items-center text-capitalize fs-6 text-black fw-semibold pb-3 lh-1'>
        <span className='me-1 fs-4'>
          <MdViewCarousel />
        </span>{' '}
        Projects
      </div>
      <div className='me-4 d-flex align-items-center text-capitalize fs-6 text-black fw-semibold pb-3 lh-1'>
        <span className='me-1 fs-4'>
          <VscTasklist />
        </span>{' '}
        Tasks
      </div>
      <div className='me-4 d-flex align-items-center text-capitalize fs-6 text-black fw-semibold pb-3 lh-1'>
        <span className='me-1 fs-4'>
          <TbArrowForward />
        </span>{' '}
        Leads
      </div>
      <div className='me-4 d-flex align-items-center text-capitalize fs-6 text-black fw-semibold pb-3 lh-1'>
        <span className='me-1 fs-4'>
          <HiCurrencyDollar />
        </span>{' '}
        Payments
      </div>
      <div className='me-4 d-flex align-items-center text-capitalize fs-6 text-black fw-semibold pb-3 lh-1'>
        <span className='me-1 fs-4'>
          <AiOutlineStock />
        </span>{' '}
        Monitoring
      </div>
      <div className='me-4 d-flex align-items-center text-capitalize fs-6 text-black fw-semibold pb-3 lh-1'>
        <span className='me-1 fs-4'>
          <MdPayment />
        </span>{' '}
        Subscription
      </div>
      <div className='me-4 d-flex align-items-center text-capitalize fs-6 text-black fw-semibold pb-3 lh-1'>
        <span className='me-1 fs-4'>
          <MdPieChart />
        </span>{' '}
        Analytics
      </div>
      <div className='me-4 d-flex align-items-center text-capitalize fs-6 text-black fw-semibold pb-3 lh-1'>
        <span className='me-1 fs-4'>
          <AiFillBook />
        </span>{' '}
        Books
      </div>
      <div className='me-4 d-flex align-items-center text-capitalize fs-6 text-black fw-semibold pb-3 lh-1'>
        <span className='me-1 fs-4'>
          <IoMdSettings />
        </span>{' '}
        Settings
      </div>
      <div className='me-4 d-flex align-items-center text-capitalize fs-6 text-black fw-semibold pb-3 lh-1'>
        <span className='me-1 fs-4'>
          <MdFiberNew />
        </span>{' '}
        News Letter
      </div>
    </Wrapper>
  );
}

export default Tabs;
const Wrapper = styled.div`
  div:hover {
    border-bottom: 4px solid blue;
    color: blue !important;
    cursor: pointer;
  }
`;
