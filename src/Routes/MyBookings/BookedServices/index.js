import React from 'react';
import {Card,Grid,Typography,Button,Divider} from '@material-ui/core';
class BookedServices extends React.Component{
  render(){
    return(
      <Grid>
      <Card style={{boxShadow:'none',}} >
      <Grid container>
      <Grid item  lg={3}md={3} sm={3} xs={5} style={{marginLeft:'4%',marginTop:'%',background:''}} >
      <Typography style={{marginLeft:'15%', marginTop:"3%"}}>REQUEST NO:</Typography>
      <Card style={{marginLeft:'%',width:'%',marginTop:'6%', marginRight:'%',border:'1px solid #DADADA'}}>
    <Typography  style={{marginTop:'8%',marginBottom:'4%',textAlign:'center'}}  >  YZ907A67B708 </Typography>
  <Card style={{background:"#616161", color:'white',marginTop:'10%',}}>  <Typography  style={{textAlign:'center',marginTop:'2%'}} > IN_PROGRESS
    </Typography></Card>
      </Card>
      </Grid>
        <Grid item lg={8}md={8} sm={8} xs={6} style={{  background:'', marginLeft:'2%'
    }} >
        <Typography style={{marginLeft:'%',marginTop:'2%',fontFamily:'Roboto Medium',fontSize:'18px'}}>HouseKeeping</Typography>
         <Grid container>
         <Grid item lg={2}md={2} sm={2} xs={5} style={{background:''}}>
         <Typography style={{marginLeft:'%',fontSize:'14px',fontFamily:'Roboto Medium',marginTop:'1%',marginBottom:'1%',color:'#bdbdbd'}}>
           Posted For:</Typography>
         </Grid>

         <Grid item lg={10}md={10} sm={10} xs={7} style={{background:''}}>
         <Typography style={{marginLeft:'0%',fontSize:'14px',fontFamily:'Roboto Medium',marginTop:'%',marginBottom:'1%'}}>30 Dec,2019</Typography>
         </Grid>
         </Grid>

         <Grid container>
         <Grid item lg={2}md={2} sm={2} xs={5}>
         <Typography style={{marginLeft:'%',fontSize:'14px',fontFamily:'Roboto Medium',marginTop:'1%',marginBottom:'1%',color:'#bdbdbd',}}>Location:</Typography>
         </Grid>

         <Grid item lg={10}md={10} sm={10} xs={7}>
         <Typography style={{marginLeft:'0%',fontSize:'14px',fontFamily:'Roboto Medium',marginTop:'%',marginBottom:'1%'
    }}>GoodWorkLabs</Typography>
         </Grid>
         </Grid>
        <Typography style={{marginLeft:'%',marginTop:'2%',fontFamily:'Roboto Medium',fontSize:'14px',color:'red'}}>Request as Urgent</Typography>
        <Typography style={{marginLeft:'%',marginTop:'2%',fontFamily:'Roboto Medium',fontSize:'14px'}}>test</Typography>
        <Button variant= "contained"  style={{marginLeft:'%',background:'#E74A3F',display:'flex',marginTop:'1%',marginBottom:'1%', color:'white',height:'20%',width:'20%'}}>CANCEL</Button>
        </Grid>
      </Grid>
      </Card>
      <Divider style= {{marginTop:'4%',marginBottom:'2%', marginLeft:'3%',marginRight:'3%'}}/>
      </Grid>
    )
  }
} export default BookedServices;
