import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { RiDoorOpenFill } from 'react-icons/ri';

function NavigationBar() {
  return (
    <Navbar>
      <Container className='mt-3'>
        <Navbar.Brand href='#home'>
          <span className='solar'>  Solar </span>
          <span className='ladder'> Ladder. </span>
         
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          <Navbar.Text>
            <p className='d-flex align-items-center text-uppercase fs-5 text-black fw-medium lh-1'>
              <span className='me-2'>
                <RiDoorOpenFill />
              </span>{' '}
              Logout
            </p>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
