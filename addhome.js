document.getElementById("homePostForm").addEventListener("submit", function(e) {
    e.preventDefault(); 

    const username = sessionStorage.getItem("usernames");
    document.getElementById('usernameiddd').value = username;

    const formData = new FormData(this);
    const formValues = {};

    formData.forEach((value, key) => {
        formValues[key] = value;
        console.log(key + " its value is " + value);
    });

    const file = document.getElementById("imgs").files[0];
    if (file) {
        // Create a storage reference
        const storageRef = storage.ref(`images/${file.name}`);

        // Upload the file
        const uploadTask = storageRef.put(file);

        // Monitor upload progress
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                document.getElementById("uploadStatus").innerText = `Upload is ${progress.toFixed(2)}% done`;
            },
            (error) => {
                console.error("Upload failed:", error);
                alert("Failed to upload image");
            },
            async () => {
                // Upload completed, now get the download URL
                const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                console.log("File available at:", downloadURL);

                // Display the uploaded image
                document.getElementById("uploadedImage").src = downloadURL;

                // Append the image URL to the form data
                formValues["imageUrl"] = downloadURL;

                // Send the form data to the server
                fetch("http://localhost:3000/create-homepost", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formValues)
                })
                .then(response => response.json())  
                .then(data => {
                    alert(data.message); 
                    window.location.href = '/index.html'; 
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert("Failed to create home post"); 
                });
            }
        );
    } else {
        alert("Please select an image first.");
    }
});