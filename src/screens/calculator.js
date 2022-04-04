import React, { useState } from "react";
import { Box, Text, FormControl, Input, Button, HStack } from "native-base";

export default function Calculator() {
    const [value1, setValue1] = useState(0);
    const [value2, setValue2] = useState(0);
    const [plus, setPlus] = useState(0);

    function add() {
        setPlus(value1 + value2);
    }

    function min() {
        setPlus(value1 - value2);
    }

    function kali() {
        setPlus(value1 * value2);
    }

    function bagi() {
        setPlus(value1 / value2);
    }

    function persen() {
        setPlus(value1 * 1 / 100);
    }

    function clearResult() {
        setPlus(0);
        setValue1(0);
        setValue2(0)
    }

    return (
        <Box safeArea
            flex={1}
            p={10}
            w="100%"
            mx="auto">

            <HStack space={5} justifyContent="center" mb="5">
                <Text fontSize="40">{plus}</Text>
            </HStack>

            <FormControl mb="5">
                <FormControl.Label>Value A</FormControl.Label>
                <Input variant="filled" keyboardType='numeric' value={String(value1)} onChangeText={(text) => setValue1(Number(text))} />
            </FormControl>
            <FormControl mb="5">
                <FormControl.Label>Value B</FormControl.Label>
                <Input variant="filled" keyboardType='numeric' value={String(value2)} onChangeText={(text) => setValue2(Number(text))} />
            </FormControl>
            <HStack space={5} justifyContent="center" mb="5">
                <Button onPress={add} w="60" h="60" colorScheme="error" _text={{ fontWeight: "800", }}>+</Button>
                <Button onPress={min} w="60" h="60" colorScheme="error" _text={{ fontWeight: "800", }}>-</Button>
                <Button onPress={kali} w="60" h="60" colorScheme="error" _text={{ fontWeight: "800", }}>x</Button>
            </HStack>

            <HStack space={5} justifyContent="center" mb="5">
                <Button onPress={bagi} w="60" h="60" colorScheme="error" _text={{ fontWeight: "800", }}>/</Button>
                <Button onPress={persen} w="60" h="60" colorScheme="error" _text={{ fontWeight: "800", }}>%</Button>
            </HStack>

            <HStack space={5} justifyContent="center">
                <Button onPress={clearResult} w="120" h="60" colorScheme="danger" _text={{ fontWeight: "800", }}>CLEAR</Button>
            </HStack>

        </Box>
    )
}