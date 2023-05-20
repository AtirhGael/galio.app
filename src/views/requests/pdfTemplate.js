import React from "react";
import {Document, Page, Text, View} from "@react-pdf/renderer";
import styles from "./style";

const MyDoc = () => {
    return (
        <Document>
            <Page size="A4" style={styles.pageCover}>
                <View
                    style={{
                        textAlign: "center",
                        display: "flex",
                        fontSize: 10,
                        flexDirection: "row",
                        lineHeight: 1.5,
                        borderBottomWidth: 2,
                        borderBottomColor: "red",
                        borderBottomStyle: "solid",
                    }}
                >
                    <View style={{width: "40%", textAlign: "center", fontSize: 10}}>
                        <Text>REPUBLIQUE DU CAMEROUN</Text>
                        <Text>Paix – Travail – Patrie</Text>
                        <Text>********</Text>
                        <Text>INSTITUT UNIVERSITAIRE DE LA CÔTE</Text>
                        <Text>DIRECTION DES AFFAIRES ADMINISTRATIVES ET FINANCIERES</Text>
                        <Text>LE DIRECTEUR</Text>
                    </View>
                    <View style={{width: "20%", textAlign: "center"}}>

                    </View>
                    <View style={{width: "40%", textAlign: "center", fontSize: 10}}>
                        <Text>REPUBLIC OF CAMEROON</Text>
                        <Text>Peace – Work – Fatherland</Text>
                        <Text>********</Text>
                        <Text>UNIVERSITY INSTITUTE OF THE COAST</Text>
                        <Text>DIRECTION DES AFFAIRES ADMINISTRATIVES ET FINANCIERES</Text>
                        <Text>THE DIRECTOR</Text>
                    </View>
                </View>
                <View style={{textAlign: "center"}}>
                    <Text style={styles.line}>
                        Reference: Lorem ipsum dolor sit amet.
                    </Text>
                </View>
                <View style={styles.line}>
                    <Text style={{textDecoration: 'underline'}}>Name of the teacher:</Text>
                    <Text>Lorem ipsum dolor sit amet.</Text>
                </View>
                <View style={styles.line}>
                    <Text style={{textDecoration: 'underline'}}>Date of submission: </Text>
                    <Text>Lorem ipsum dolor sit amet.</Text>
                </View>
                <View style={styles.line}>
                    <Text style={{textDecoration: 'underline'}}>Prenom: </Text>
                    <Text>Lorem ipsum dolor sit amet.</Text>
                </View>
                <View style={styles.line}>
                    <Text style={{textDecoration: 'underline'}}>Numero de contrat: </Text>
                    <Text>Lorem ipsum dolor sit amet.</Text>
                </View>
                <View style={styles.line}>
                    <Text style={{textDecoration: 'underline'}}>Ecole: </Text>
                    <Text>Lorem ipsum dolor sit amet.</Text>
                </View>
                <View style={styles.line}>
                    <Text style={{textDecoration: 'underline'}}>Jour: </Text>
                    <Text>Lorem ipsum dolor sit amet.</Text>
                </View>
                <View style={styles.line}>
                    <Text style={{textDecoration: 'underline'}}>Semaine: </Text>
                    <Text>Lorem ipsum dolor sit amet.</Text>
                </View>
                <View style={styles.line}>
                    <Text style={{textDecoration: 'underline'}}>Classe: </Text>
                    <Text>Lorem ipsum dolor sit amet.</Text>
                </View>
                <View style={styles.line}>
                    <Text style={{textDecoration: 'underline'}}>Matiere: </Text>
                    <Text>Lorem ipsum dolor sit amet.</Text>
                </View>
                <View style={styles.line}>
                    <Text style={{textDecoration: 'underline'}}>Horaire: </Text>
                    <Text>Lorem ipsum dolor sit amet.</Text>
                </View>
                <View style={styles.line}>
                    <Text style={{textDecoration: 'underline'}}>Description: </Text>
                    <Text>Lorem ipsum dolor sit amet.</Text>
                </View>
                <View style={{display: "flex", flexDirection: "row", marginTop: 16}}>
                    <Text style={{width: 100 / 3 + "%", fontSize: 10}}>
                        The visa of the teacher
                    </Text>
                    <Text style={{width: 100 / 3 + "%", fontSize: 10, padding: "0 8px"}}>
                        Reception date and hour by the teacher’s Service
                    </Text>
                    <Text style={{width: 100 / 3 + "%", fontSize: 10}}>
                        The visa of the teacher service manage
                    </Text>
                </View>
            </Page>
        </Document>
    );
};
export default MyDoc;
