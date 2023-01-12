import ImageList from '@mui/material/ImageList';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import axios from 'axios';
import { Container } from '@mui/system';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Autocomplete from '@mui/material/Autocomplete';
import { Button } from '@mui/material';
import { TextField, Input } from '@material-ui/core';
import React, { useState, useEffect, Component } from 'react'
import SortIcon from '@mui/icons-material/Sort';
// import Navbar from '../components/Navbar';

export default function Home() {

  const [product, setProduct] = useState([{}])
  const [filterStatus, setFilterStatus] = React.useState(false)
  const [sortStatus, setSortStatus] = React.useState(false)
  const [selectedName, setSelected] = useState([]);
  const [minAmount, setMinAmount] = useState<number>(0);
  const [maxAmount, setMaxAmount] = useState<number>(0);
  let [sortAmount, setSortAmount] = useState<number>(0)

  console.log(selectedName)
  console.log(minAmount)
  console.log(sortAmount)



  const handleSort = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSortAmount(sortAmount = 1)
  };
  const changeSort = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSortAmount(sortAmount = -1)
  };
  const handleChange = (value: any) => {
    if (value != null) {
      setSelected(value)
    }
    else {
      setSelected([])
    }

  }
  const myStyle = {
    backgroundImage:
      "url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgICAgIBwcHBwcHBwoIBwcHBw8ICQcKFREWFhURExMYHSggGBolJxMTITEhJSkrLi4uFx8zODMsNygtLisBCgoKDQ0NFQ8PFSsdFR0rKys3Ny0rKys3KysrNys3KzcrLSsrKysrKystKysrLSsrLSsrKzcrLSsrKysrKysrK//AABEIASwAqAMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAAAAQIDB//EABwQAQEBAQEAAwEAAAAAAAAAAAABEQJBITFRA//EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFxEBAQEBAAAAAAAAAAAAAAAAAAERIf/aAAwDAQACEQMRAD8A9xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAS1U+NBQAAAAAAAAAAAAASrExQAAASArLQAAAAAAAAAAAAACUFAAAAAAAAAAAAAAAAAAAAAAAAEigAAAAAAAAAAAAAAAAAAIoAAAnqpICgAAAAAAAAAAAAAAAAAAAAAAAAAkUgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAigAAAAAAAAAAAAAAAAJ6qRQRQAAAAAAAAAAAAAAAAABKBFAAAAAAEoAluS04+RGgBQAAAAAAABFAAAAAAAEUBj+n1n6vMyNYCZ0AFAAAAAAAAAAAAAAAAAABi9xqUFE1QAAAAAAAAAAAAAAAAGO98bTBK4c8Xdrt41hQkxy53XVmRpIoAoAAAAAAAAAAAAAAAAJaqUEjSRQAAAAAAf/Z')",
    height: '300vh',
    marginTop: '0px',
    fontSize: '50px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };




  useEffect(() => {
    async function fetchProduct() {


      const result = await axios.get(`http://127.0.0.1:8000/reviews/product/?productName=${selectedName}&minAmount=${minAmount}&maxAmount=${maxAmount}&sortAmount=${sortAmount}`)
        // {
        //   headers: {
        //     "productName": selectedName,
        //     "minAmount": minAmount,
        //     "maxAmount":maxAmount

        //   }
        // })
        .then(result => {
          console.log(result.data)
          setProduct(result.data)

        })

    };
    fetchProduct();
  }, [selectedName, maxAmount, minAmount, sortAmount]);

  return (

    <div>
      {/* <Navbar></Navbar> */}

      <div style={myStyle}>



        <Container>
          <IconButton onClick={() => { setFilterStatus(!filterStatus) }}>
            <FilterAltIcon />
          </IconButton>


          {filterStatus && <Container>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={product.map((item: any) => (
                item.productName
              ))}
              onChange={(event, value) => handleChange(value)}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Filter By Name" />}

            />

            <TextField
              type="number"
              label="Min"
              value={minAmount}

              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setMinAmount(Number(event.target.value))}
            />
            <TextField
              type="number"
              label="Max"
              value={maxAmount}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setMaxAmount(Number(event.target.value))}
            />

          </Container>
          }

          <IconButton onClick={() => { setSortStatus(!sortStatus) }}><SortIcon /></IconButton>

          {sortStatus && <Container>
            <Button onClick={handleSort}>min-max</Button>/
            <Button onClick={changeSort} >max-min</Button>
          </Container>}


          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <ImageList sx={{ width: 1600 }} cols={3} rowHeight={160}>
              {product.map((item: any) => (
                <Card key={item?.img} sx={{ height: 600 }}>
                  <AspectRatio>
                    <img

                      src={item.productImage}
                      srcSet={item.productImage}
                      loading="lazy"

                    />
                  </AspectRatio>
                  <>
                    <h1>{item.productName}</h1>
                    <p>{item.description}</p>
                    <h2>{item.amount}</h2>
                  </>

                </Card>
              ))}

            </ImageList>
          </Box>
        </Container>
      </div>
    </div>
  )
}



