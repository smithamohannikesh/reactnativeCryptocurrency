import React, {useEffect, useState} from  'react'
import { View,Text,StyleSheet,ActivityIndicator,Image} from 'react-native'
import {TouchableOpacity,FlatList} from 'react-native'
import {useDispatch,useSelector} from 'react-redux'
 import {getAlldata} from '../redux/action/action'
 
 export const Home=(props:any )=>{
    const dispatch=useDispatch();
    const newsdata:any=useSelector((state:any)=>state.app.currencies)
    console.log("news"+newsdata)
    const[loading,setLoading]=useState(false);
    const [page,setpage]=useState(1)
    useEffect(()=>{
       // dispatch(getAlldata(page))
      // getAlldata(page)
      // setLoading(false)
      getnewPosts(page)
    },[dispatch,page])

    useEffect(()=>{
            const interval=setInterval(async () => { setpage(page+1)
                
            },10000)
            clearInterval(interval);
    },[page]

    )

     const navigatedetails=()=>{  
       props.navigation.navigate('Details')
    }
     const getnewPosts=(page:number)=>{
         setLoading(true)
         dispatch(getAlldata())
         setLoading(false)

     }
    console.log(newsdata);
    return(
            <View  testID="home-wrapper">
                {/* <Text>{newsdata.name}</Text> */}
                   <FlatList
                   data={newsdata}
                    keyExtractor={(item:any)=>item.id}
                    renderItem={itemdata=>(
                        <View style={styles.card} >
                            <View style={styles.display}>
                            <Text style={styles.text}> {itemdata.item.name}</Text>
                            <Text style={styles.textRight}> ${   Math.round(itemdata.item.market_data.price_usd * 100) / 100  }</Text>
                            </View>
                            <View style={styles.display}>
                            <Text style={styles.text}> {itemdata.item.symbol}</Text>
                            <Text style={styles.textRight}> 
                            { Math.round(itemdata.item.roi_data.percent_change_year_to_date) / 100  }%
                            </Text>
                            
                            </View>
                            
                        </View>

                    )}
                    
                    onEndReachedThreshold={.5}
                    numColumns={1}
                    
                   />
                {loading && <ActivityIndicator size="large" color="blue"/>}
                
                <TouchableOpacity style={styles.card} onPress={()=>{navigatedetails()}}>
                    <Text style={styles.text}> +Add a Cryptocurrency</Text>      
                </TouchableOpacity>
            </View>
    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text:{
        color:'red',
        fontSize:16,
        paddingBottom:5,
        
    },
    textRight:{
        color:'red',
        fontSize:16,
       flexDirection:"row"
      
        
    },
    card:{
        flex:1,
        width:"100%",
        backgroundColor:"white",
        margin:10,borderBottomWidth:.5,
        borderBottomColor:"grey"
        
    },
    display:{
        flexDirection:"row",
       marginRight:20,
      justifyContent: "space-between",
        
    }
  });
  