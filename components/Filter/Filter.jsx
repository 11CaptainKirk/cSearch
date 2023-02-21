import { Card, Text } from "@mantine/core";
import Image from "next/image";

function FilterItem({ itemName }) {
    return <Text>{itemName}</Text>;
}
export default function Filter({ category }) {
    return (
        <Card shadow="sm" radius="lg">
            <FilterItem itemName={"WHAT THIS IS A THING"} />
        </Card>
    );
}
