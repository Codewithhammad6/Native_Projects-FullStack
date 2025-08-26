import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  FlatList,
} from "react-native";
import useProductStore from "../../store/useProductStore.ts";

function EditProduct({ route, navigation }) {
  const { product } = route.params;
  const { updateProduct } = useProductStore();

  const [formData, setFormData] = useState({
    title: product.title || "",
    price: product.price ? product.price.toString() : "",
    oldPrice: product.oldPrice ? product.oldPrice.toString() : "",
    offer: product.offer || "",
    color: product.color || "",
    category: product.category || "",
    size: product.size || "",
    trendingDeal: product.trendingDeal || "no",
    todayDeal: product.todayDeal || "no",
    carouselImages: product.carouselImages || [],
  });

  const [newImageUrl, setNewImageUrl] = useState("");
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [editingImageIndex, setEditingImageIndex] = useState(null);

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleAddImage = () => {
    if (newImageUrl.trim() === "") {
      Alert.alert("Error", "Please enter an image URL");
      return;
    }

    const updatedImages = [...formData.carouselImages, newImageUrl];
    setFormData({ ...formData, carouselImages: updatedImages });
    setNewImageUrl("");
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formData.carouselImages];
    updatedImages.splice(index, 1);
    setFormData({ ...formData, carouselImages: updatedImages });
  };

  const handleEditImage = (index) => {
    setEditingImageIndex(index);
    setNewImageUrl(formData.carouselImages[index]);
    setImageModalVisible(true);
  };

  const handleUpdateImage = () => {
    if (newImageUrl.trim() === "") {
      Alert.alert("Error", "Please enter an image URL");
      return;
    }

    const updatedImages = [...formData.carouselImages];
    updatedImages[editingImageIndex] = newImageUrl;
    setFormData({ ...formData, carouselImages: updatedImages });
    setNewImageUrl("");
    setEditingImageIndex(null);
    setImageModalVisible(false);
  };

  const handleUpdate = async () => {
    // Validate required fields
    if (!formData.title || !formData.price) {
      Alert.alert("Error", "Title and Price are required fields");
      return;
    }

    // Prepare data for submission
    const updateData = {
      ...formData,
      price: Number(formData.price),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : 0,
    };

    const success = await updateProduct(product._id, updateData);

    if (success) {
      Alert.alert("Success", "Product updated successfully!");
      navigation.goBack();
    } else {
      Alert.alert("Error", "Failed to update product");
    }
  };

  const renderCarouselImage = ({ item, index }) => (
    <View style={styles.imageItem}>
      <Image source={{ uri: item }} style={styles.thumbnail} />
      <View style={styles.imageActions}>
        <TouchableOpacity
          style={[styles.imageButton, styles.editButton]}
          onPress={() => handleEditImage(index)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.imageButton, styles.deleteButton]}
          onPress={() => handleRemoveImage(index)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionHeader}>Basic Information</Text>
      <TextInput
        style={styles.input}
        value={formData.title}
        onChangeText={(t) => handleChange("title", t)}
        placeholder="Product Title"
        placeholderTextColor={"gray"}
      />
      
      <Text style={styles.sectionHeader}>Pricing</Text>
      <TextInput
        style={styles.input}
        value={formData.price}
        onChangeText={(t) => handleChange("price", t)}
        keyboardType="numeric"
        placeholder="Current Price"
        placeholderTextColor={"gray"}

      />
      <Text style={styles.sectionHeader}>Old Pricing (optional)</Text>

      <TextInput
        style={styles.input}
        value={formData.oldPrice}
        onChangeText={(t) => handleChange("oldPrice", t)}
        keyboardType="numeric"
        placeholder="Original Price (optional)"
        placeholderTextColor={"gray"}

      />
      <Text style={styles.sectionHeader}>Offer (optional)</Text>

      <TextInput
        style={styles.input}
        value={formData.offer}
        onChangeText={(t) => handleChange("offer", t)}
        placeholder="Offer Percentage (e.g., 25%)"
        placeholderTextColor={"gray"}

      />

      <Text style={styles.sectionHeader}>Product Category</Text>
           <View>
             <Text style={{fontWeight:500}}>Popular categories :</Text>
             <Text style={{marginBottom:4}}>Men , Jewelery , Ladies , Home , Deals , Electronics , Mobiles , Fashion</Text>
           </View>
      <TextInput
        style={styles.input}
        value={formData.category}
        onChangeText={(t) => handleChange("category", t)}
        placeholder="Category"
        placeholderTextColor={"gray"}

      />
      <Text style={styles.sectionHeader}>Color</Text>
      <TextInput
        style={styles.input}
        value={formData.color}
        onChangeText={(t) => handleChange("color", t)}
        placeholder="Color"
        placeholderTextColor={"gray"}

      />
      <Text style={styles.sectionHeader}>Size</Text>

      <TextInput
        style={styles.input}
        value={formData.size}
        onChangeText={(t) => handleChange("size", t)}
        placeholder="Size"
        placeholderTextColor={"gray"}

      />

      <Text style={styles.sectionHeader}>Deal Status</Text>
      <View style={styles.toggleContainer}>
        <Text>Trending Deal: </Text>
        <View style={styles.toggleGroup}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              formData.trendingDeal === "yes" && styles.toggleButtonActive
            ]}
            onPress={() => handleChange("trendingDeal", "yes")}
          >
            <Text style={formData.trendingDeal === "yes" && styles.toggleButtonTextActive}>
              Yes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              formData.trendingDeal === "no" && styles.toggleButtonActive
            ]}
            onPress={() => handleChange("trendingDeal", "no")}
          >
            <Text style={formData.trendingDeal === "no" && styles.toggleButtonTextActive}>
              No
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.toggleContainer}>
        <Text>Today's Deal: </Text>
        <View style={styles.toggleGroup}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              formData.todayDeal === "yes" && styles.toggleButtonActive
            ]}
            onPress={() => handleChange("todayDeal", "yes")}
          >
            <Text style={formData.todayDeal === "yes" && styles.toggleButtonTextActive}>
              Yes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              formData.todayDeal === "no" && styles.toggleButtonActive
            ]}
            onPress={() => handleChange("todayDeal", "no")}
          >
            <Text style={formData.todayDeal === "no" && styles.toggleButtonTextActive}>
              No
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.sectionHeader}>Product Images</Text>
      <Text style={styles.subHeader}>Carousel Images ({formData.carouselImages.length})</Text>
      
      <FlatList
        data={formData.carouselImages}
        renderItem={renderCarouselImage}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.imageList}
      />

      <View style={styles.addImageContainer}>
        <TextInput
          style={[styles.input, styles.flexGrow]}
          value={newImageUrl}
          onChangeText={setNewImageUrl}
          placeholder="Enter image URL"
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={editingImageIndex !== null ? handleUpdateImage : handleAddImage}
        >
          <Text style={styles.addButtonText}>
            {editingImageIndex !== null ? "Update" : "Add"}
          </Text>
        </TouchableOpacity>
      </View>

      {editingImageIndex !== null && (
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => {
            setNewImageUrl("");
            setEditingImageIndex(null);
          }}
        >
          <Text style={styles.cancelButtonText}>Cancel Edit</Text>
        </TouchableOpacity>
      )}

      <View style={styles.saveButtonContainer}>
        <Button title="Save Changes" onPress={handleUpdate} />
      </View>

      <Modal
        visible={imageModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setImageModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Image URL</Text>
            <TextInput
              style={styles.input}
              value={newImageUrl}
              onChangeText={setNewImageUrl}
              placeholder="Enter image URL"
            />
            <View style={styles.modalButtons}>
              <Button title="Update" onPress={handleUpdateImage} />
              <Button title="Cancel" onPress={() => setImageModalVisible(false)} color="#999" />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    backgroundColor: '#fff',
    flex: 1,
    padding: 10,
    marginTop:25
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#333",
  },
  subHeader: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    justifyContent: "space-between",
  },
  toggleGroup: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  toggleButtonActive: {
    backgroundColor: "#2196F3",
  },
  toggleButtonTextActive: {
    color: "white",
    fontWeight: "bold",
  },
  imageList: {
    marginBottom: 15,
    maxHeight: 120,
  },
  imageItem: {
    marginRight: 15,
    alignItems: "center",
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 5,
  },
  imageActions: {
    flexDirection: "row",
  },
  imageButton: {
    padding: 5,
    borderRadius: 4,
    marginHorizontal: 2,
    minWidth: 50,
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#4CAF50",
  },
  deleteButton: {
    backgroundColor: "#f44336",
  },
  buttonText: {
    color: "white",
    fontSize: 12,
  },
  addImageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  flexGrow: {
    flex: 1,
    marginRight: 10,
    marginBottom: 0,
  },
  addButton: {
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 8,
    minWidth: 80,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#ff9800",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  cancelButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  saveButtonContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
});

export default EditProduct;