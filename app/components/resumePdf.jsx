import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// Create Document Component
function ResumePdf({ items }) {
    const total = items.reduce((acc, x) => {
        return acc + x.subtotal
    }, 0);

    return (
        <Document>
            <Page style={styles.body}>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        {new Intl.DateTimeFormat('es-CL', {
                            dateStyle: 'full',
                        }).format(new Date())}
                    </Text>
                    <Text style={styles.title}>Total: ${total}</Text>
                </View>
                <View style={styles.table}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Producto</Text>
                        <Text style={styles.title}>Cantidad</Text>
                        <Text style={styles.title}>Subtotal</Text>
                    </View>

                    {items.map(i => {
                        return (
                            <div key={i.product_name}>
                                <View style={styles.row}>
                                    <View style={styles.content}>
                                        <Text style={styles.conent_text}>{i.product_name}</Text>
                                    </View>
                                    <View style={styles.content}>
                                        <Text style={styles.conent_text}>{i.cantidad}</Text>
                                    </View>
                                    <View style={styles.content}>
                                        <Text style={styles.conent_text}>${i.subtotal}</Text>
                                    </View>
                                </View>
                            </div>
                        )
                    })}
                </View>

                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                    `${pageNumber} / ${totalPages}`
                )} fixed />
            </Page>
        </Document>
    )
};

Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row',
    },
    conent_text: {
        fontSize: 14,
        textAlign: 'left',
        fontFamily: 'Oswald',
        marginRight: 12,
        marginbottom: 8,
        padding: 6,
    },
    content: {
        backgroundColor: '',
        display: 'flex',
        flexDirection: 'column',
        height: 60,
        width: 126,
        alignItems: 'left',
        borderBottom: '1px solid #ccc',
        padding: 6
    },

    title: {
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Oswald',
        marginRight: 60,
        padding: 6
    },

    header: {
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        height: 42,
        borderBottom: '1px solid #ccc'
    },

    table: {
        width: '100%',
        border: '1px #cccc solid',
    },
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
});

export default ResumePdf;