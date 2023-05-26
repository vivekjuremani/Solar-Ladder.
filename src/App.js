
import './App.css';
import React, { useState, useCallback,useEffect } from 'react';
import Dropzone from './Dropzone';
import { RiEdit2Line } from 'react-icons/ri';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { InputGroup ,FormControl} from 'react-bootstrap'
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { GrFormAdd } from "react-icons/gr";
import Col from 'react-bootstrap/Col';
import { MDBSwitch } from 'mdb-react-ui-kit';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import { v4 as uuidv4 } from 'uuid';
import NavigationBar from './NavigationBar'
import Tabs from './Tabs';
import Books from './Books'
import {
  doc,
  onSnapshot,
  updateDoc,
  setDoc,
  deleteDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import {db,storage} from './Firebase.js';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";

import { v4 } from "uuid";
const App= () => {
  const colletionRef = collection(db, 'schools');
  const intial ={item_name: null,
    item_code: null,
    category: null,
    stock_quantity: null,
    stock_on_hold: 0,
    stock_value: 0,
    purchase_price: null,
    low_stock_warning:false,
    low_stock_unit:0 ,
    item_desc:null,
    item_unit:null,
    item_gst:null,
    purchase_price: null,
    include_gst:false,
    date:  new Date().toISOString().split('T')[0],
    img: null,
  };
  const [state, setstate ] =useState(intial);
const [img,setimg] =useState('');
const [show, setShow] = useState(false);
const [edit,setedit ] =useState(false);
const [editidx,seteditidx] =useState('');
const handleClose = () => {setShow(false);  setstate(intial); setimg(null) }
const handleShow = () => { setShow(true) };
const [lowstock,setlowstock] =useState(false);
const [lowstockarray, setlowstockarray] =useState([]);
async function  addondb (url){
 
  const newSchool = {
    ...state, 
     createdAt: serverTimestamp(),
     lastUpdate: serverTimestamp(),
     id: uuidv4(),
     img: url,
   stock_quantity:(state.stock_quantity?state.stock_quantity:0),
   purchase_price:(state.purchase_price?state.purchase_price:0),    
   };
  
   try {
     const schoolRef = doc(colletionRef, newSchool.id);
     await setDoc(schoolRef, newSchool);
   } catch (error) {
     console.error(error);
   }
   setLoading(false);
}
async function addSchool() {
  setLoading(true);
  let img1=img;
  if (img)
   { const imageRef = ref(storage, `images/${state.img.name + v4()}`);
    uploadBytes(imageRef, state.img).then((snapshot) => {
      console.log(state.img)
      getDownloadURL(snapshot.ref).then((url) => {
        setstate({...state});
      img1.startsWith("blob") ? addondb(url) : addondb(img1)
      });
    });
  }
  else
  addondb(null);
 
}
async function deleteSchool(school) {
  setLoading(true);
  try {
    const schoolRef = doc(colletionRef, school.id);
    await deleteDoc(schoolRef, schoolRef);
  } catch (error) {
    console.error(error);
  }
    
  setLoading(false);
}
async function editSchool(school,val) {
  setLoading(true);
  const updatedSchool = {
    stock_quantity: val,
    lastUpdate: serverTimestamp(),
  };

  try {
    const schoolRef = doc(colletionRef, school.id);
    updateDoc(schoolRef, updatedSchool);
  } catch (error) {
    console.error(error);
  }
  setLoading(false);
}
const handleSave = () =>{
setLoading(true);
setstate({...state});
if(edit)
deleteSchool(tableData[editidx])
addSchool();
  console.log(state);
setimg('');
setedit(false)

handleClose();

}
const onDrop = (acceptedFiles) => {
  // this callback will be called after files get dropped, we will get the acceptedFiles. If you want, you can even access the rejected files too
  setstate({...state, img:acceptedFiles[0]})
  const urls = acceptedFiles.map((file) => URL.createObjectURL(file));
  setimg(urls[0]);
    

};
  const [tableData, setTableData] = useState([
    {
      item_name: 'Item 1',
      item_code: 'ABC123',
      category: 'Category 1',
      stock_quantity: 10,
      stock_on_hold: 2,
      stock_value: 100,
      purchase_price: 50,
      low_stock_warning:true,
      low_stock_unit:5,
    },
    {
      item_name: 'Item 1',
      item_code: 'ABC123',
      category: 'Category 1',
      stock_quantity: 10,
      stock_on_hold: 2,
      stock_value: 100,
      purchase_price: 50,
      low_stock_warning:true,
      low_stock_unit:20,
    },
    {
      item_name: 'Item 1',
      item_code: 'ABC123',
      category: 'Category 1',
      stock_quantity: 10,
      stock_on_hold: 2,
      stock_value: 100,
      purchase_price: 50,
      low_stock_warning:false,
      low_stock_unit:80,
    },
    ,
    // Add more data objects as needed
  ]);
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [adjustindex,setadjustindex] = useState(0);
  const [finalstock,setfinalstock]=useState({ add: true , val: null})
  const handleCheckboxChange = (index) => {
    const selectedIndex = selectedRows.indexOf(index);
    let updatedSelectedRows = [];

    if (selectedIndex === -1) {
      // Add to selected rows
      updatedSelectedRows = [...selectedRows, index];
    } else {
      // Remove from selected rows
      updatedSelectedRows = selectedRows.filter((rowIndex) => rowIndex !== index);
    }
console.log("dvds")
    setSelectedRows(updatedSelectedRows);
  };

  const handleEdit = (index) => {
    setstate(tableData[index]);
    setedit(true);
    console.log(tableData[index].img);
    setimg(tableData[index].img)
  seteditidx(index)
    handleShow(index);
   //  edit that index 
  };

  const [adjustshow, adjustsetShow] = useState(false);

  const adjusthandleClose = () => {adjustsetShow(false);  setfinalstock({ add: true , val: null})}
  const adjusthandleSave = () => {
    // setadjusted index id will update database
    setLoading(true);
   let value=finalstock.add?parseInt(tableData[adjustindex].stock_quantity)  +  parseInt(finalstock.val?  finalstock.val : 0)  : parseInt(tableData[adjustindex].stock_quantity) - parseInt(finalstock.val?  finalstock.val : 0)
    editSchool(tableData[adjustindex] , value);
   
  adjustsetShow(false);
   setadjustindex(0);
    setfinalstock({ add: true , val: null})
  };
  const adjusthandleShow = () => adjustsetShow(true);
  const AdjustPrice = (index) => {
       setadjustindex(index);
       adjusthandleShow();
  };
  const handleGroupDelete = () => {
  setLoading(true);
    var updatedData = [...selectedRows];
    var set = new Set(updatedData);
    updatedData.map((idx)=>{
      deleteSchool(tableData[idx]);
    })
   updatedData = tableData.filter((x,idx)=>{ 
    return  !set.has(idx);
  })
// setLoading(false);
    
    
     setSelectedRows([]);
   
  };
  const [delshow, delsetShow] = useState(false);

  const delhandleDelete = () => { handleGroupDelete() ;   delsetShow(false); }
  const delhandleClose = () => { delsetShow(false); }
  const delhandleShow = () => delsetShow(true);
  const [empty,setempty]= useState(true);
  useEffect(() => {
   

    setLoading(true);
 // const unsub = onSnapshot(q, (querySnapshot) => {
    const unsub = onSnapshot(colletionRef, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setTableData(items);
     if(items.length==0)
     {setempty(true);  setTableData([intial])}
     else
     setempty(false);
      setLoading(false);
    });
    return () => {
      unsub();
    };
  }, []);
  return (
    loading ?  <Button variant="dark" disabled  className='spinner'>
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    Loading ...
  </Button> :
    ( <div  >
       <NavigationBar />
      <hr />
      <Tabs />
      <hr className='m-0' />
      <Books />
      <hr className='m-0'  />
      <div className='Flex'>
      <Button variant="outline-primary" onClick={()=> {setlowstock(!lowstock) }} > Show Low Stock </Button>{' '}
      <FloatingLabel controlId="floatingSelect" label="Category">
      <Form.Select aria-label="Floating label select example"   > 
        <option hidden selected>Category</option>
        <option value="Panel">Panel</option>
        <option value="Inverter">Inverter</option>
        <option value="Wire">Wire</option>
        <option value="Other">Other</option>
      </Form.Select>
    </FloatingLabel>
      <Button  variant="outline-danger" onClick={delhandleShow}  disabled={selectedRows.length==0} className='Flex'>
    <div>
     
     <AiFillDelete/>
     </div>
     <div>
       
          Delete Selected
       </div>   
       </Button >
       <Button  variant="primary" onClick={handleShow}  className='Flex'>
    <div>
     
    <GrFormAdd  color="white" />
     </div>
     <div>
       
          Add To Inventory
       </div>   
       </Button >
       </div>
       <hr className='m-0 ' />
      <Table   hover>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                //onChange={() => handleCheckboxChange(-1)}
                checked={selectedRows&&selectedRows.length>0}
              />
            </th>
            <th>Item Name</th>
            <th>Category</th>
            <th>Stock Quantity</th>
            <th>Stock On Hold</th>
            <th>Stock Value</th>
            <th>Purchase Price</th>
            <th>   </th>
            <th>   </th>
          </tr>
        </thead>
        <tbody>
          {!empty&&tableData.map((item, index) => (
          !lowstock?(
          <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(index)}
                  checked={selectedRows.includes(index)}
                />
              </td>
              <td>{item?.item_name}</td>
              <td>{item?.category}</td>
              <td>{item?.stock_quantity} {item?.item_unit} </td>
              <td>{item?.stock_on_hold} {item?.item_unit}</td>
              <td>{parseInt(item?.purchase_price)* parseInt(item?.stock_quantity)}</td>
              <td>{parseInt(item?.purchase_price) + parseInt(item?.include_gst!='on'? (parseInt(item?.item_gst) * parseInt(item?.purchase_price)) / 100 : 0 )}</td>
      <td>
      {   item?.low_stock_warning&&item?.low_stock_unit>=item?.stock_quantity&&<Button   variant="outline-warning" onClick={() => handleEdit(index)} >
               <BsFillExclamationTriangleFill />
                </Button>

          }
        </td>   
              <td>
                


                
                <Button   variant="light" onClick={() => handleEdit(index)} style={{marginRight:"10px"}}>
                  <RiEdit2Line  />
                </Button>
                <Button variant="outline-dark" onClick={() => AdjustPrice(index)}>
                Adjust price 
                </Button>
              </td>
            </tr>
         ): (item?.low_stock_warning&&item?.low_stock_unit>=item?.stock_quantity &&  <tr key={index}>
          <td>
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange(index)}
              checked={selectedRows.includes(index)}
            />
          </td>
          <td>{item?.item_name}</td>
          <td>{item?.category}</td>
          <td>{item?.stock_quantity} {item?.item_unit} </td>
          <td>{item?.stock_on_hold} {item?.item_unit}</td>
          <td>{parseInt(item?.purchase_price)* parseInt(item?.stock_quantity)}</td>
          <td>{parseInt(item?.purchase_price) + parseInt(item?.include_gst=='on'? (parseInt(item?.item_gst) * parseInt(item?.purchase_price)) / 100 : 0 )}</td>
  <td>
  {   item?.low_stock_warning&&item?.low_stock_unit>=item?.stock_quantity&&<Button   variant="outline-warning" onClick={() => handleEdit(index)} >
           <BsFillExclamationTriangleFill />
            </Button>

      }
    </td>   
          <td>
            


            
            <Button   variant="light" onClick={() => handleEdit(index)} style={{marginRight:"10px"}}>
              <RiEdit2Line  />
            </Button>
            <Button variant="outline-dark" onClick={() => AdjustPrice(index)}>
            Adjust price 
            </Button>
          </td>
        </tr>) ))}
        </tbody>
      </Table>
      
       <Modal show={delshow} onHide={delhandleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Selected Inventory item</Modal.Title>
        </Modal.Header>
        <Modal.Body>Inventory item will be permanently deleted</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" onClick={delhandleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={delhandleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={adjustshow} onHide={adjusthandleClose}>
        <Modal.Header >
          <Modal.Title>Adjust Stock Quantity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <h6 className='light'> <span className="fw-bold">Item Name</span>:     { tableData[adjustindex]?.item_name} </h6>
            <h6 className='light'> <span className="fw-bold">Current Stock </span>:  {tableData[adjustindex]?.stock_quantity} pcs  </h6>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Check
            inline
            label="Add (+)"
            name="group1"
            type="radio"
            id={`1`}
            onClick={()=>setfinalstock({...finalstock,add:1})}
            defaultChecked
          />
          <Form.Check
            inline
           label="Sub (-)"
            name="group1"
            type= "radio"
            onClick={()=>setfinalstock({...finalstock,add:0})}
            id={`2`}
          />

            <FloatingLabel
         controlId="floatingInput"
         label="Adjust stock"
         className="mb-3"
      >
        <Form.Control type="Number" placeholder= "0 pcs"  value={finalstock.val} onChange={ (e) =>{ setfinalstock({...finalstock,val:e.target.value})} }/>
      </FloatingLabel>
            </Form.Group>
            <h6 className='light'> <span className="fw-bold">Final </span>:  {finalstock.add?parseInt(tableData[adjustindex].stock_quantity)  +  parseInt(finalstock.val?  finalstock.val : 0)  : parseInt(tableData[adjustindex].stock_quantity) - parseInt(finalstock.val?  finalstock.val : 0)} pcs  </h6>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
        <FloatingLabel controlId="floatingTextarea2" label="Remarks optimal">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: '100px' }}
        />
      </FloatingLabel>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" onClick={adjusthandleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={adjusthandleSave}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>
      

      <Modal show={show} onHide={handleClose} size='xl'>
        <Modal.Header closeButton>
          <Modal.Title>{edit?state.item_name:` Create Item`}</Modal.Title>
        </Modal.Header>
        <Modal.Body >
        <Table bordered  >
      <thead>
        <tr>
        
          <th>General Details</th>
          <th>Stock Details</th>
          
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
          <h6 >Upload Item Images</h6>
          <Dropzone onDrop={onDrop} accept={"image/*"}  img={img}/>
     <FloatingLabel
         controlId="floatingInput"
         label="Item Name"
         className="mb-3"
      >
        <Form.Control type="text" placeholder= "0 pcs"  value={state.item_name} onChange={ (e) =>{ setstate({...state,item_name:e.target.value})} }/>
      </FloatingLabel>
      <FloatingLabel controlId="floatingSelect" label="Category">
      <Form.Select aria-label="Floating label select example"  value={state.category?state.category :null } onChange={ (e) =>{ setstate({...state,category:e.target.value})}} > 
        <option hidden selected>Category</option>
        <option value="Panel">Panel</option>
        <option value="Inverter">Inverter</option>
        <option value="Wire">Wire</option>
        <option value="Other">Other</option>
      </Form.Select>
    </FloatingLabel>
    <FloatingLabel
         controlId="floatingInput"
         label="Item Code"
         className="mb-3"
      >
        <Form.Control type="text" placeholder= "0 pcs"    className="w-75 p-3" value={state.item_code} onChange={ (e) =>{ setstate({...state,item_code:e.target.value})} }/>
      </FloatingLabel>
      <FloatingLabel controlId="floatingTextarea2" label="Item Description">
        <Form.Control
          as="textarea"
          placeholder="Item Description"
          style={{ height: '100px' }}
        
        value={state.item_desc} 
        onChange={ (e) =>{ setstate({...state,item_desc:e.target.value})} }
      />
        </FloatingLabel>
          </td>
          <td>
          <Row>
        <Col>
        <FloatingLabel controlId="floatingSelect" label="Units">
      <Form.Select aria-label="Floating label select example"  value={state.item_unit } onChange={ (e) =>{ setstate({...state,item_unit:e.target.value})}} > 
        <option hidden selected>Units</option>
        <option value="FT">Feet(FT)</option>
        <option value="IN">Inch(IN)</option>
        <option value="PCS">Pieces(PCS)</option>
        <option value="NOS">Numbers(NOS)</option>
      </Form.Select>
    </FloatingLabel>
        </Col>
        <Col>
        <FloatingLabel
         controlId="floatingInput"
         label="Opening Stock"
         className="mb-3"
      >
        
       
        <Form.Control type="Number" placeholder= "0 pcs"    value={state.stock_quantity} onChange={ (e) =>{ setstate({...state,stock_quantity:e.target.value})} } />
       </FloatingLabel>
        </Col>
      </Row>
      <FloatingLabel
         controlId="floatingInput"
         label="As of Date"
         className="mb-3"
      >
       <Form.Control type="date" placeholder= "0 pcs"  value={state.date} onChange={ (e) =>{ setstate({...state,date:e.target.value})} }   />
       </FloatingLabel>
       <Row>
        <Col>
        
       <Form>
      <Form.Check 
        type="switch"
        id="custom-switch"
        label=" Enable low stock warning  "
        onChange={ (e) =>{ setstate({...state,low_stock_warning:e.target.value})}}
      />
    </Form>
        </Col>
        <Col>
        
    <FloatingLabel
         controlId="floatingInput"
         label="low stock unit"
         className="mb-3"
      >
         <Form.Control type="Number" placeholder= "0 pcs"    value={state.low_stock_unit} onChange={ (e) =>{ setstate({...state,low_stock_unit:e.target.value})} } />
       </FloatingLabel>
        </Col>
       </Row>
    <div className="underline"></div>
    <th > Pricing Detail</th>
    <div className="underline"></div> <br/>
    <tr>
    <Row>
        <Col>
        <FloatingLabel
         controlId="floatingInput"
         label="Purchase Price"
         className="mb-3"
      >
        
       
        <Form.Control type="Number" placeholder= "0 pcs"    value={state.purchase_price} onChange={ (e) =>{ setstate({...state,purchase_price:e.target.value})} } />
       </FloatingLabel>
        </Col>
        <Col>
        <Form>
      <Form.Check 
        type="switch"
        id="custom-switch"
        label=" Inclusive of Tax"
        onChange={ (e) =>{ setstate({...state,include_gst:e.target.value})}}
      />
    </Form>
        
        </Col>
      </Row>
      <FloatingLabel controlId="floatingSelect" label="GST Tax Rate % ">
      <Form.Select aria-label="Floating label select example"  value={state.item_gst} onChange={ (e) =>{ setstate({...state,item_gst:e.target.value})}} > 
        <option hidden selected>Units</option>
        <option value="0">GST @ 0 % </option>
        <option value="0.25">GST @ 0.25 %</option>
        <option value="1">GST @ 1 %</option>
        <option value="5">GST @ 5 %</option>
      </Form.Select>
    </FloatingLabel>
    </tr>
        </td> 
        
        </tr> 
      </tbody>
    </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    )
  );
}

export default App;
