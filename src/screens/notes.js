import React, { useState, useEffect } from "react";
import { Box, FormControl, Input, Button, Divider, TextArea, Stack } from "native-base";
import { FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import axios from "axios"

export default function Notes() {
    const [post, setPost] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    const [formData, setFormData] = useState({
        title: "",
        body: ""
    })

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

    const _renderItem = ({ item }) => {
        return (
            <ListItem
                key={item._id.toString()}
                bottomDivider
            >
                <ListItem.Content>
                    <ListItem.Title h4 numberOfLines={1}>
                        {item.title}
                    </ListItem.Title>
                    <ListItem.Subtitle numberOfLines={2}>
                        {item.body}
                    </ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        )
    }

    const addData = () => {
        setIsLoading(true)
        axios
            .post("https://api.kontenbase.com/query/api/v1/67ee14bb-eb01-4eba-a4ec-4ee83b65c36f/Notes", { ...formData })
            .then(() => {
                getData()
                setFormData('')
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err);
                alert("Error POST data")
                setIsLoading(false)
            })
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
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                    <TextArea placeholder="Notes"
                        variant="filled"
                        id="body"
                        name="body"
                        value={formData.body}
                        onChange={(e) => setFormData({ ...formData, body: e.target.value })}
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