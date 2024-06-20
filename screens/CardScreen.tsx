import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from "react-native";
import axios from "axios";
import Actions from "./ActionsScreen";
import { ChallengeData, Calendar, Customer } from "../app/models/ChallengeData"

const uri = "https://reactnativeelements.com/img/avatar/avatar--photo.jpg";

const Card: React.FC = () => {
    const [months, setMonths] = useState<Calendar[]>([]);
    const [customer, setCustomer] = useState<Customer | null>(null);

    const getData = async () => {
        const response = await axios.get<ChallengeData>('https://xjvq5wtiye.execute-api.us-east-1.amazonaws.com/interview/api/v1/challenge');
        const data = response.data;
        data.calendar[1].actions = [];
        setMonths(data.calendar.slice(0, 3));
        setCustomer(data.customer);
    };

    useEffect(() => {
        getData();
    }, []);

    const getMonthName = (number: number): string => {
        switch (number) {
            case 5:
                return "June";
            case 6:
                return "July";
            case 7:
                return "August";
            default:
                return "Unknown month";
        }
    };

    return (
        <ScrollView>
            {months && months.map((item) => (
                <View key={`${item.month}-${item.year}`} style={styles.monthContainer}>
                    <Text style={styles.monthText}>{getMonthName(item.month)} 2024</Text>
                    {!item.actions.length ? (
                        <View style={styles.noMaintenanceContainer}>
                            <Text style={styles.noMaintenanceText}>No Maintenance Scheduled</Text>
                        </View>
                    ) : (
                        customer && <Actions actions={item.actions} customer={customer} />
                    )}
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    monthContainer: {
        display: "flex",
        justifyContent: "space-around"
    },
    monthText: {
        fontSize: 18,
        marginTop: 21,
        paddingLeft: 18
    },
    noMaintenanceContainer: {
        backgroundColor: "#848FA5",
        width: 340,
        marginLeft: 50,
        borderRadius: 10,
        padding: 10
    },
    noMaintenanceText: {
        fontSize: 10,
        fontWeight: "700",
        color: "white"
    }
});

export default Card;
