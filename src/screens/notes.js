import React, { useState, useEffect } from "react";
import { Box, FormControl, Input, Button, Divider, TextArea, Stack, VStack, HStack } from "native-base";
import { FlatList, TouchableOpacity } from "react-native";
import { ListItem } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons'
import axios from "axios"

export default function Notes() {

    //get Data
    const [post, setPost] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    //Function Exception
    useEffect(() => {
        getData()
    }, [])
    // Create Function to fetch
    const getData = () => {
        setIsLoading(true)
        axios
            .get("https://api.kontenbase.com/query/api/v1/67ee14bb-eb01-4eba-a4ec-4ee83b65c36f/Notes")
            .then((res) => {
                setPost(res.data)
                setIsLoading(false)
            })
            .catch(() => {
                alert("Error fetch data")
                setIsLoading(false)
            })
    }

    //add Data
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const formData = { title, body }
    const addData = () => {
        setIsLoading(true)
        axios
            .post("https://api.kontenbase.com/query/api/v1/67ee14bb-eb01-4eba-a4ec-4ee83b65c36f/Notes", { ...formData })
            .then(() => {
                getData()
                setTitle('')
                setBody('')
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err);
                alert("Error POST data")
                setIsLoading(false)
            })
    }

    const deleteData = (id) => {
        setIsLoading(true)
        axios
            .delete("https://api.kontenbase.com/query/api/v1/67ee14bb-eb01-4eba-a4ec-4ee83b65c36f/Notes/" + id)
            .then(() => {
                getData()
                setIsLoading(false)
            })
            .catch(() => {
                alert("Error DELETE data")
                setIsLoading(false)
            })
    }


    //renderData
    const _renderItem = ({ item }) => {
        return (
            <ListItem
                key={item._id.toString()}
                bottomDivider>
                <ListItem.Content>
                    <VStack space={3}>
                        <ListItem.Title h4 numberOfLines={1}>
                            {item.title}
                        </ListItem.Title>
                        <ListItem.Subtitle numberOfLines={3}>
                            {item.body}
                        </ListItem.Subtitle>
                        <TouchableOpacity
                            onPress={() => deleteData(item._id.toString())}><Ionicons name="trash" size={16} color="black" /></TouchableOpacity>
                    </VStack>
                </ListItem.Content>
            </ListItem>
        )
    }
    return (
        <Box safeArea
            flex={1}
            p={10}
            w="100%"
            mx="auto">

            <Stack mb="10">
                <FormControl mb="3">
                    <Input
                        variant="filled"
                        placeholder="Judul" mb="2"
                        value={title}
                        onChangeText={title => setTitle(title)}
                    />
                    <TextArea placeholder="Notes"
                        variant="filled"
                        value={body}
                        onChangeText={body => setBody(body)}
                    />
                </FormControl>
                <Button colorScheme="error"
                    onPress={addData}
                >Save</Button>
            </Stack>
            <Divider my="5" />

            <FlatList
                data={post}
                renderItem={_renderItem}
                keyExtractor={(item) => item._id.toString()}
                refreshing={isLoading}
                onRefresh={getData}
            />
        </Box>
    )
}