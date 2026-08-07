import { Modal, View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

export default function EventPreview({ visible, onClose, organizerName, eventData }) {
    if (!eventData) return null;

    return (
        <Modal visible={visible} animationType="slide" onRequestClose={onClose} transparent>
            <View style={styles.overlay}>
                <View style={styles.card}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Preview</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={24} color="#000" />
                        </TouchableOpacity>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {eventData.imageUri && (
                            <Image source={{ uri: eventData.imageUri }} style={styles.image} />
                        )}
                        <Text style={styles.eventTitle}>{eventData.title || 'Untitled Event'}</Text>
                        <Text style={styles.organizer}>By {organizerName}</Text>
                        <Text style={styles.description}>{eventData.description}</Text>
                        <Text style={styles.meta}>Category: {eventData.category || '—'}</Text>
                        <Text style={styles.meta}>
                            {eventData.eventMode === 'online'
                                ? `Online — ${eventData.meetLink || 'link pending'}`
                                : `Venue: ${eventData.location || '—'}`}
                        </Text>
                        {eventData.isPaid && (
                            <Text style={styles.meta}>Price: ₹{eventData.price || 0}</Text>
                        )}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}

EventPreview.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    organizerName: PropTypes.string,
    eventData: PropTypes.object,
};

const styles = StyleSheet.create({
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    card: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: '85%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: { fontSize: 18, fontWeight: '700' },
    image: { width: '100%', height: 180, borderRadius: 12, marginBottom: 12 },
    eventTitle: { fontSize: 20, fontWeight: '800', marginBottom: 4 },
    organizer: { fontSize: 13, color: '#666', marginBottom: 12 },
    description: { fontSize: 14, marginBottom: 12 },
    meta: { fontSize: 13, color: '#444', marginBottom: 6 },
});
