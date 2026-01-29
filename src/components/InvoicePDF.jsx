import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    lineHeight: 1.6,
    fontFamily: "Helvetica"
  },
  heading: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold"
  },
  section: {
    marginBottom: 15
  },
  label: {
    fontWeight: "bold"
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6
  }
});

const InvoicePDF = ({ payment }) => {
  if (!payment) return null;

  const formattedDate = payment.date ? new Date(payment.date).toLocaleString() : "N/A";
  const formattedAmount = payment.amount ? payment.amount.toLocaleString("en-US", { style: "currency", currency: "USD" }) : "$0";

  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.heading}>Payment Invoice</Text>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Invoice ID:</Text>
            <Text>{payment._id || "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>User Email:</Text>
            <Text>{payment.userEmail || "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Amount:</Text>
            <Text>{formattedAmount}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date:</Text>
            <Text>{formattedDate}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Status:</Text>
            <Text>{payment.status || "Pending"}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text>Thank you for using UrbanFix services!</Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
