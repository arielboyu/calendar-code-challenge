import React from 'react';
import { View, Text, StyleSheet, Image } from "react-native";
import { CheckCircleIcon } from "react-native-heroicons/solid";
import { ClockIcon } from "react-native-heroicons/outline";
import { format, parseISO } from 'date-fns';
import { Action, Customer } from "../app/models/ChallengeData"
import imageMap from "../assets/image.json"


interface ActionsProps {
    actions: Action[];
    customer: Customer;
}


const ActionsScreen: React.FC<ActionsProps> = ({ actions, customer }) => {
    const getColorcard = (status: string): string => {
        if (status === 'Completed') {
            return "#00B47D";
        } else if (status === 'Scheduled') {
            return "#006A4B";
        } else {
            return "#011638";
        }
    };

    const formatDate = (dateString: string): string => {
        const date = parseISO(dateString);
        const fullDayName = format(date, 'EEEE');
        return fullDayName.substring(0, 3);
    };

    const getDayFromDate = (dateString: string): string => {
        return dateString.split('T')[0].split('-')[2];
    };


    return (
        <>
            {actions.map((item) => (
                <View key={item.id} style={styles.cardContainer}>
                    {item.status === 'Unscheduled' ? (
                        <View><Text style={styles.textTBD}>TBD</Text></View>
                    ) : (
                        <View style={styles.sideBanner}>
                            <Text style={styles.dayText}>{formatDate(item.scheduledDate || '')}</Text>
                            <Text style={styles.dateText}>{getDayFromDate(item.scheduledDate || '')}</Text>
                            {item.status === 'Completed' ? (
                                <CheckCircleIcon color="green" />
                            ) : (
                                <ClockIcon color="green" />
                            )}
                        </View>
                    )}

                    <View style={styles.spacing}></View>
                    <View style={[styles.cardContent, { backgroundColor: getColorcard(item.status) }]}>
                        <Text style={styles.cardTitle}>{item.name}</Text>
                        {item.status !== 'Unscheduled' && item.vendor && (
                            <View>
                                <Text style={styles.vendorInfo}>{item.vendor.vendorName}</Text>
                                <Text style={styles.vendorPhone}>{item.vendor.phoneNumber}</Text>
                            </View>
                        )}

                        <Text style={styles.customerInfo}><Image style={styles.PinMap} source={{ uri: imageMap.PinMapUrl }} ></Image>{" "}{customer.street}</Text>
                        {item.status === 'Unscheduled' ? (
                            <Text style={styles.unscheduledText}>Schedule date & time TBD</Text>
                        ) : (
                            <Text style={styles.scheduledText}>
                                {item.status} {item.arrivalStartWindow} {item.arrivalEndWindow}
                            </Text>
                        )}
                    </View>
                </View>
            ))}
        </>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        height: 94,
        width: 370,
        marginTop: 20,
        marginLeft: 20,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    sideBanner: {
        height: 100,
        width: 20
    },
    PinMap: {
        width: 10,
        height: 10
    },
    dayText: {
        width: 23,
        fontSize: 10,
    },
    dateText: {
        width: 23,
        fontSize: 15,
        fontWeight: "bold",
        paddingBottom: 3
    },
    spacing: {
        marginLeft: 10,
        borderRadius: 6
    },
    cardContent: {
        width: 340,
        borderRadius: 10,
        paddingLeft: 10,
        paddingTop: 4
    },
    cardTitle: {
        fontSize: 13,
        fontWeight: "bold",
        color: "white"
    },
    vendorInfo: {
        fontSize: 10,
        color: "white"
    },
    vendorPhone: {
        fontSize: 10,
        color: "white",
        fontWeight: "bold"
    },
    customerInfo: {
        marginTop: 4,
        fontSize: 10,
        color: "white"
    },
    unscheduledText: {
        fontSize: 10,
        color: "white"
    },
    scheduledText: {
        fontSize: 10,
        color: "white"
    },
    monthText: {
        fontSize: 18,
        marginTop: 21,
        paddingLeft: 18
    },
    textTBD: {
        fontSize: 11,
        fontWeight: "bold"
    }
});

export default ActionsScreen;
