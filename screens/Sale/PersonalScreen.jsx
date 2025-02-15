import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  RefreshControl,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  HStack,
  NativeBaseProvider,
  VStack,
  Box,
  ScrollView,
  Center,
  AspectRatio,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
} from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, SimpleLineIcons } from '@expo/vector-icons';
import styles from './Styles';
import SalesController from '../../controller/Sales';

function PersonalScreen({ route, navigation }) {
  const { onGoBack } = route.params;
  // const [item, setItems] = useState([]);
  const [SavedProduct, setSavedProduct] = useState(true);
  const [OnSale, setOnSale] = useState(false);
  const [SellRecord, setSellRecord] = useState(false);

  useEffect(() => {
    SalesController.getPersonalItem()
      .then((res) => {
        onGoBack();
      })
      .catch((err) => {
        throw err;
      });
  }, []);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    SalesController.getPersonalItem().then((res) => {
      onGoBack();
      setRefreshing(false);
    });
  };

  const savedStatus = () => {
    setSavedProduct(true);
    setOnSale(false);
    setSellRecord(false);
  };

  const onsaleStatus = () => {
    setSavedProduct(false);
    setOnSale(true);
    setSellRecord(false);
  };

  const recordStatus = () => {
    setSavedProduct(false);
    setOnSale(false);
    setSellRecord(true);
  };

  // function SavedProductCard() {
  //   return (
  //     <HStack alignItems="center" space={2}>
  //       <Box alignItems="center" marginTop="5">
  //         <Box
  //           maxW="150"
  //           maxH="230"
  //           rounded="md"
  //           overflow="hidden"
  //           borderRadius="15"
  //           borderColor="coolGray.200"
  //           borderWidth="1.5"
  //           _dark={{
  //             borderColor: "coolGray.600",
  //             backgroundColor: "white",
  //           }}
  //           _web={{
  //             shadow: 2,
  //             borderWidth: 0,
  //           }}
  //           _light={{
  //             backgroundColor: "white",
  //           }}
  //         >
  //           <Box>
  //             <AspectRatio w="100%" ratio={3 / 3}>
  //               <Image
  //                 source={{
  //                   uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
  //                 }}
  //                 alt="image"
  //               />
  //             </AspectRatio>
  //           </Box>
  //           <Stack p="5" space={3}>
  //             <Stack space={2}>
  //               <Heading size="sm" ml="-1" bold>
  //                 商品名稱
  //               </Heading>
  //               <HStack justifyContent="space-between">
  //                 <Text
  //                   fontSize="sm"
  //                   _light={{
  //                     color: "#28527A",
  //                   }}
  //                   _dark={{
  //                     color: "white",
  //                   }}
  //                   fontWeight="500"
  //                   ml="-0.5"
  //                   mt="-1"
  //                 >
  //                   $100
  //                 </Text>
  //                 <TouchableOpacity>
  //                   {/* saved ? (
  //                     <FontAwesome name='bookmark' size={24} color='#0C4A6E' />
  //                   ) : (
  //                     <FontAwesome
  //                       name='bookmark-o'
  //                       size={24}
  //                       color='#0C4A6E'
  //                     />
  //                   ) */}
  //                 </TouchableOpacity>
  //               </HStack>
  //             </Stack>
  //           </Stack>
  //         </Box>
  //       </Box>
  //       <Box alignItems="center" marginTop="5">
  //         <Box
  //           maxW="150"
  //           maxH="230"
  //           rounded="md"
  //           overflow="hidden"
  //           borderRadius="15"
  //           borderColor="coolGray.200"
  //           borderWidth="1.5"
  //           _dark={{
  //             borderColor: "coolGray.600",
  //             backgroundColor: "white",
  //           }}
  //           _web={{
  //             shadow: 2,
  //             borderWidth: 0,
  //           }}
  //           _light={{
  //             backgroundColor: "white",
  //           }}
  //         >
  //           <Box>
  //             <AspectRatio w="100%" ratio={3 / 3}>
  //               <Image
  //                 source={{
  //                   uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
  //                 }}
  //                 alt="image"
  //               />
  //             </AspectRatio>
  //           </Box>
  //           <Stack p="5" space={3}>
  //             <Stack space={2}>
  //               <Heading size="sm" ml="-1" bold>
  //                 商品名稱
  //               </Heading>
  //               <HStack justifyContent="space-between">
  //                 <Text
  //                   fontSize="sm"
  //                   _light={{
  //                     color: "#28527A",
  //                   }}
  //                   _dark={{
  //                     color: "white",
  //                   }}
  //                   fontWeight="500"
  //                   ml="-0.5"
  //                   mt="-1"
  //                 >
  //                   $100
  //                 </Text>
  //                 <TouchableOpacity>
  //                   {/* saved ? (
  //                     <FontAwesome name='bookmark' size={24} color='#0C4A6E' />
  //                   ) : (
  //                     <FontAwesome
  //                       name='bookmark-o'
  //                       size={24}
  //                       color='#0C4A6E'
  //                     />
  //                   ) */}
  //                 </TouchableOpacity>
  //               </HStack>
  //             </Stack>
  //           </Stack>
  //         </Box>
  //       </Box>
  //     </HStack>
  //   );
  // }

  function NoSavedProduct() {
    return (
      <View style={styles.ghostContainer}>
        <SimpleLineIcons name="ghost" size={45} color="#BFBFBF" />
        <Text fontSize="3xl" style={styles.noSavedText}>
          沒有收藏的商品喔
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('拍賣', { onGoBack: onRefresh });
          }}
          style={styles.HeadButton}
        >
          <View style={styles.HeadContainer}>
            <Text fontSize="lg" style={styles.HeadText}>
              前往拍賣首頁逛逛!
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  function OnsaleProductCard() {
    return (
      <HStack alignItems="center" space={2}>
        <Box alignItems="center" marginTop="5">
          <Box
            maxW="160"
            maxH="240"
            rounded="md"
            overflow="hidden"
            borderRadius="15"
            borderColor="coolGray.200"
            borderWidth="1.5"
            _dark={{
              borderColor: 'coolGray.600',
              backgroundColor: 'white',
            }}
            _web={{
              shadow: 2,
              borderWidth: 0,
            }}
            _light={{
              backgroundColor: 'white',
            }}
          >
            <Box>
              <AspectRatio w="100%" ratio={3 / 3}>
                <Image
                  source={{
                    uri: 'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
                  }}
                  alt="image"
                />
              </AspectRatio>
            </Box>
            <Stack p="5" space={3}>
              <Stack space={2}>
                <Heading size="sm" ml="-1" bold>
                  商品名稱
                </Heading>
                <HStack justifyContent="space-between">
                  <Text
                    fontSize="sm"
                    _light={{
                      color: '#28527A',
                    }}
                    _dark={{
                      color: 'white',
                    }}
                    fontWeight="500"
                    ml="-0.5"
                    mt="-1"
                  >
                    $100
                  </Text>
                </HStack>
                <Box
                  margin="2"
                  bg="#28527A"
                  _dark={{
                    bg: '#28527A',
                  }}
                  _text={{
                    color: '#FBEEAC',
                    fontWeight: '500',
                    fontSize: '14',
                  }}
                  position="absolute"
                  left="65"
                  bottom="0"
                  px="3"
                  py="1.5"
                  borderRadius="5"
                >
                  出售
                </Box>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box alignItems="center" marginTop="5">
          <Box
            maxW="160"
            maxH="240"
            rounded="md"
            overflow="hidden"
            borderRadius="15"
            borderColor="coolGray.200"
            borderWidth="1.5"
            _dark={{
              borderColor: 'coolGray.600',
              backgroundColor: 'white',
            }}
            _web={{
              shadow: 2,
              borderWidth: 0,
            }}
            _light={{
              backgroundColor: 'white',
            }}
          >
            <Box>
              <AspectRatio w="100%" ratio={3 / 3}>
                <Image
                  source={{
                    uri: 'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
                  }}
                  alt="image"
                />
              </AspectRatio>
            </Box>
            <Stack p="5" space={3}>
              <Stack space={2}>
                <Heading size="sm" ml="-1" bold>
                  商品名稱
                </Heading>
                <HStack justifyContent="space-between">
                  <Text
                    fontSize="sm"
                    _light={{
                      color: '#28527A',
                    }}
                    _dark={{
                      color: 'white',
                    }}
                    fontWeight="500"
                    ml="-0.5"
                    mt="-1"
                  >
                    $100
                  </Text>
                </HStack>
                <Box
                  margin="2"
                  bg="#28527A"
                  _dark={{
                    bg: '#28527A',
                  }}
                  _text={{
                    color: '#FBEEAC',
                    fontWeight: '500',
                    fontSize: '14',
                  }}
                  position="absolute"
                  left="65"
                  bottom="0"
                  px="3"
                  py="1.5"
                  borderRadius="5"
                >
                  收購
                </Box>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </HStack>
    );
  }

  function SellRecordProductCard() {
    return (
      <HStack alignItems="center" space={2}>
        <Box alignItems="center" marginTop="5">
          <Box
            maxW="150"
            maxH="230"
            rounded="md"
            overflow="hidden"
            borderRadius="15"
            borderColor="coolGray.200"
            borderWidth="1.5"
            _dark={{
              borderColor: 'coolGray.600',
              backgroundColor: 'white',
            }}
            _web={{
              shadow: 2,
              borderWidth: 0,
            }}
            _light={{
              backgroundColor: 'white',
            }}
          >
            <Box justifyContent="center" alignItems="center" borderRadius="10">
              <AspectRatio w="100%" ratio={3 / 3}>
                <Image
                  source={{
                    uri: 'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
                  }}
                  alt="image"
                />
              </AspectRatio>
              <Center
                margin="2"
                bg="#F4D160"
                _dark={{
                  bg: '#FBEEAC',
                }}
                _text={{
                  color: '#28527A',
                  fontWeight: '700',
                  fontSize: '14',
                  textAlign: 'center',
                }}
                position="absolute"
                px="3"
                py="1.5"
                borderRadius="5"
              >
                8/30
              </Center>
            </Box>
            <Stack p="5" space={3}>
              <Stack space={2}>
                <Heading size="sm" ml="-1" bold>
                  商品名稱
                </Heading>
                <HStack justifyContent="space-between">
                  <Text
                    fontSize="sm"
                    _light={{
                      color: '#28527A',
                    }}
                    _dark={{
                      color: 'white',
                    }}
                    fontWeight="500"
                    ml="-0.5"
                    mt="-1"
                  >
                    $100
                  </Text>
                </HStack>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box alignItems="center" marginTop="5">
          <Box
            maxW="150"
            maxH="230"
            rounded="md"
            overflow="hidden"
            borderRadius="15"
            borderColor="coolGray.200"
            borderWidth="1.5"
            _dark={{
              borderColor: 'coolGray.600',
              backgroundColor: 'white',
            }}
            _web={{
              shadow: 2,
              borderWidth: 0,
            }}
            _light={{
              backgroundColor: 'white',
            }}
          >
            <Box justifyContent="center" alignItems="center">
              <AspectRatio w="100%" ratio={3 / 3}>
                <Image
                  source={{
                    uri: 'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
                  }}
                  alt="image"
                />
              </AspectRatio>
              <Center
                margin="2"
                bg="#F4D160"
                _dark={{
                  bg: '#FBEEAC',
                }}
                _text={{
                  color: '#28527A',
                  fontWeight: '700',
                  fontSize: '14',
                  textAlign: 'center',
                }}
                position="absolute"
                px="3"
                py="1.5"
                borderRadius="5"
              >
                暫售
              </Center>
            </Box>
            <Stack p="5" space={3}>
              <Stack space={2}>
                <Heading size="sm" ml="-1" bold>
                  商品名稱
                </Heading>
                <HStack justifyContent="space-between">
                  <Text
                    fontSize="sm"
                    _light={{
                      color: '#28527A',
                    }}
                    _dark={{
                      color: 'white',
                    }}
                    fontWeight="500"
                    ml="-0.5"
                    mt="-1"
                  >
                    $100
                  </Text>
                </HStack>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </HStack>
    );
  }

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <LinearGradient
          style={styles.myPlaceContainter}
          colors={['#1784B2', '#1D74A0', '#28527A']}
        />
        <HStack top="-45%" alignItems="center" justifyContent="center">
          <Feather
            name="arrow-left"
            size={26}
            color="white"
            onPress={() => navigation.navigate('拍賣', { onGoBack: onRefresh })}
            style={styles.buttonBack}
          />
          <Feather name="user" size={24} color="white" />
          <Text
            style={{
              color: 'white',
              fontSize: 24,
              fontWeight: '700',
              paddingTop: 10,
              paddingLeft: 5,
              paddingRight: 30,
            }}
          >
            我的小舖
          </Text>
        </HStack>
        <VStack top="-45%" h="5">
          <HStack justifyContent="center" alignItems="center" top="45%">
            <TouchableOpacity onPress={() => console.log('message')}>
              <LinearGradient
                // Button Linear Gradient
                colors={['#359DD9', '#1784B2']}
                style={styles.personalButton}
              >
                <HStack justifyContent="center" alignItems="center">
                  <Feather name="message-circle" size={24} color="white" />
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      fontSize: 14,
                      fontWeight: '700',
                      marginLeft: 5,
                    }}
                  >
                    私訊
                  </Text>
                </HStack>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('新增商品', { onGoBack: onRefresh });
              }}
            >
              <LinearGradient
                // Button Linear Gradient
                colors={['#359DD9', '#1784B2']}
                style={styles.personalButton}
              >
                <HStack justifyContent="center" alignItems="center">
                  <Feather name="plus" size={24} color="white" />
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      fontSize: 14,
                      fontWeight: '700',
                      marginLeft: 5,
                    }}
                  >
                    新增
                  </Text>
                </HStack>
              </LinearGradient>
            </TouchableOpacity>
          </HStack>
          <HStack
            justifyContent="center"
            alignItems="center"
            top="55%"
            space={3}
          >
            <TouchableOpacity onPress={savedStatus}>
              {SavedProduct ? (
                <LinearGradient
                  // Button Linear Gradient
                  colors={['#28527A', '#28527A', '#0288D1']}
                  style={styles.buttonTagPressed}
                >
                  <Text
                    style={{
                      color: '#FBEEAC',
                      textAlign: 'center',
                      fontSize: 16,
                      marginTop: 10,
                    }}
                  >
                    收購商品
                  </Text>
                </LinearGradient>
              ) : (
                <View style={styles.textContainer}>
                  <Text style={styles.tagText}>收購商品</Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={onsaleStatus}>
              {OnSale ? (
                <LinearGradient
                  // Button Linear Gradient
                  colors={['#28527A', '#28527A', '#0288D1']}
                  style={styles.buttonTagPressed}
                >
                  <Text
                    style={{
                      color: '#FBEEAC',
                      textAlign: 'center',
                      fontSize: 16,
                      marginTop: 10,
                    }}
                  >
                    上架中
                  </Text>
                </LinearGradient>
              ) : (
                <View style={styles.textContainer}>
                  <Text style={styles.tagText}>上架中</Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={recordStatus}>
              {SellRecord ? (
                <LinearGradient
                  // Button Linear Gradient
                  colors={['#28527A', '#28527A', '#0288D1']}
                  style={styles.buttonTagPressed}
                >
                  <Text
                    style={{
                      color: '#FBEEAC',
                      textAlign: 'center',
                      fontSize: 16,
                      marginTop: 10,
                    }}
                  >
                    售出紀錄
                  </Text>
                </LinearGradient>
              ) : (
                <View style={styles.textContainer}>
                  <Text style={styles.tagText}>售出紀錄</Text>
                </View>
              )}
            </TouchableOpacity>
          </HStack>
        </VStack>
        <ScrollView>
          {SellRecord ? (
            <Center flex={1}>
              <SellRecordProductCard />
              <SellRecordProductCard />
              <SellRecordProductCard />
              <View style={{ marginBottom: 10 }} />
            </Center>
          ) : (
            <View />
          )}
          {OnSale ? (
            <Center flex={1}>
              <Text style={styles.onsaleNum}>你有XX件商品上架中</Text>
              <Divider my="2" />
              <OnsaleProductCard />
              <OnsaleProductCard />
              <OnsaleProductCard />
              <View style={{ marginBottom: 10 }} />
            </Center>
          ) : (
            <View />
          )}
          {SavedProduct ? (
            <Center flex={1}>
              <NoSavedProduct />
            </Center>
          ) : (
            <View />
          )}
        </ScrollView>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

export default PersonalScreen;
