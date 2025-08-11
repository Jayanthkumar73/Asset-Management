import React, { useState, useEffect } from "react";
import "./Maintenance.css";
import Warehouse from "./Warehouse";
import Upcoming from "./Upcoming";
import axios from 'axios';

const Maintenance = () => {
  const [view, setView] = useState("assetService");
  const [assets, setAssets] = useState([]);
  const [currentAssets, setCurrentAssets] = useState([]);
  const [suggestedRepairs, setSuggestedRepairs] = useState([]);
  const [currentAsset, setCurrentAsset] = useState(null);
  const [currentAssetDescription, setCurrentAssetDescription] = useState("");
  const [currentRepairDate, setCurrentRepairDate] = useState('');
  const [newAsset, setNewAsset] = useState({
    assetType: "",
    assetName: "",
    assetModelId: "",
    dealer: "",
    warrantyDate: "",
    repairSentDate: ""
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (view === "serviceSuggestion") {
      fetch("https://asset-management-2-60qv.onrender.com/api/cssassetservice")
        .then((res) => res.json())
        .then((data) => {
          // Normalize the data to ensure consistent ID properties
          const normalizedData = data.map(asset => ({
            ...asset,
            _id: asset._id || asset.id || asset.assetModelId
          }));
          setSuggestedRepairs(normalizedData);
        })
        .catch((err) => {
          console.error("Error fetching service suggestion data:", err);
        });
    }
  }, [view]);

  useEffect(() => {
    axios.get('https://asset-management-2-60qv.onrender.com/api/assetservice')
      .then((res) => {
        console.log(res.data);
        // Normalize the data to ensure consistent ID properties
        const normalizedData = res.data.map(asset => ({
          ...asset,
          _id: asset._id || asset.id || asset.assetModelId
        }));
        setAssets(normalizedData);
        setCurrentAssets(normalizedData.slice(0, itemsPerPage));
        setSuggestedRepairs(normalizedData);
      })
      .catch((error) => console.error("Error fetching assets:", error));
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(assets.length / itemsPerPage);
  
  const handleClickPage = (page) => {
    setCurrentPage(page);
    const startIndex = (page - 1) * itemsPerPage;
    setCurrentAssets(assets.slice(startIndex, startIndex + itemsPerPage));
  };
  
  const handlePrevPage = () => currentPage > 1 && handleClickPage(currentPage - 1);
  const handleNextPage = () => currentPage < totalPages && handleClickPage(currentPage + 1);

  // Add new asset
  const handleAddAsset = () => {
    // Ensure the dates are in ISO string format
    const formattedAsset = {
      ...newAsset,
      warrantyDate: newAsset.warrantyDate ? new Date(newAsset.warrantyDate).toISOString() : null,
      repairSentDate: newAsset.repairSentDate ? new Date(newAsset.repairSentDate).toISOString() : null,
    };

    fetch("https://asset-management-2-60qv.onrender.com/api/assetservice/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formattedAsset),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to add asset");
        return response.json();
      })
      .then((addedAsset) => {
        // Normalize the added asset
        const normalizedAsset = {
          ...addedAsset,
          _id: addedAsset._id || addedAsset.id || addedAsset.assetModelId
        };
        setAssets((prevAssets) => [...prevAssets, normalizedAsset]);
        setNewAsset({
          assetType: "",
          assetName: "",
          assetModelId: "",
          dealer: "",
          warrantyDate: "",
          repairSentDate: "",
        });
        setView("viewAsset");
        handleClickPage(1);
      })
      .catch((error) => console.error("Error adding asset:", error));
  };

  const handleDeleteAsset = async (assetModelId) => {
    if (!assetModelId) {
      console.error("❌ Cannot delete: No valid assetModelId provided");
      return;
    }
  
    try {
      console.log("🗑️ Attempting to delete asset with assetModelId:", assetModelId);
  
      const response = await fetch(`https://asset-management-2-60qv.onrender.com/api/assetservice/model/${assetModelId}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        const errMessage = await response.text();
        throw new Error(`Failed to delete asset. Server says: ${errMessage}`);
      }
  
      const result = await response.json();
      console.log("✅ Deleted:", result);
  
      // Update UI
      setAssets((prevAssets) => prevAssets.filter((a) => a.assetModelId !== assetModelId));
      setSuggestedRepairs((prevRepairs) => prevRepairs.filter((a) => a.assetModelId !== assetModelId));
  
      const isLastItemOnPage = currentAssets.length === 1;
      const newPage = isLastItemOnPage && currentPage > 1 ? currentPage - 1 : currentPage;
      handleClickPage(newPage);
      
    } catch (error) {
      console.error("❌ Error deleting asset:", error.message);
      alert("Error deleting asset: " + error.message);
    }
  };
  
  
  const handleExtendAsset = (asset) => {
    console.log("Extend asset called with:", asset);
    
    if (!asset) {
      console.error("❌ Invalid asset passed to extend: asset is null or undefined");
      return;
    }
    
    // Identify which ID property exists
    const assetId = asset._id || asset.id || asset.assetModelId;
    
    if (!assetId) {
      console.error("❌ Invalid asset passed to extend: no ID property found", asset);
      return;
    }
    
    // Create a normalized asset with consistent _id property
    const normalizedAsset = {
      ...asset,
      _id: assetId
    };
    
    setCurrentAsset(normalizedAsset);
    setCurrentRepairDate(asset.repairDate || "");
  };

  const handleUpdateAsset = async () => {
    if (!currentAsset || !currentAsset._id) {
      console.error("❌ Invalid currentAsset or missing ID");
      return;
    }

    try {
      const res = await fetch(`https://asset-management-2-60qv.onrender.com/api/assets/${currentAsset._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          warrantyDate: currentRepairDate,
        }),
      });

      const contentType = res.headers.get("content-type");
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP ${res.status} - ${errorText}`);
      }

      if (contentType && contentType.includes("application/json")) {
        const updated = await res.json();
        console.log("✅ Updated asset:", updated);
        
        // Update the asset in both state arrays
        const updateAssetInArray = (array) => {
          return array.map(asset => {
            if (asset._id === currentAsset._id || 
                asset.id === currentAsset._id || 
                asset.assetModelId === currentAsset._id) {
              return { ...asset, warrantyDate: currentRepairDate };
            }
            return asset;
          });
        };
        
        setAssets(updateAssetInArray(assets));
        setSuggestedRepairs(updateAssetInArray(suggestedRepairs));
        
      } else {
        console.warn("⚠️ Server did not return JSON.");
      }

      setCurrentAsset(null); // Close modal

    } catch (err) {
      console.error("Update error:", err.message || err);
    }
  };
  
  const handleMoveToWarehouse = () => {
    console.log("Asset moved to warehouse:", currentAsset);
    setCurrentAsset(null);
  };

  return (
    <div className="maintenance-container">
      {/* Sidebar */}
      <div className="sidebar">
        <button
          className={view === "assetService" ? "active" : ""}
          onClick={() => setView("assetService")}
        >
          Asset Service
        </button>
        <button
          className={view === "serviceSuggestion" ? "active" : ""}
          onClick={() => setView("serviceSuggestion")}
        >
          Service Suggestion
        </button>
        <button
          className={view === "warehouse" ? "active" : ""}
          onClick={() => setView("warehouse")}
        >
          Warehouse
        </button>
        <button
          className={view === "upcomingAssets" ? "active" : ""}
          onClick={() => setView("upcomingAssets")}
        >
          Upcoming Assets
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {view === "assetService" && (
          <div>
            <button onClick={() => setView("addAsset")}>Add</button>
            <button onClick={() => setView("viewAsset")}>View</button>
          </div>
        )}
        
        {view === "serviceSuggestion" && (
          <div className="bg-[#e6f0fa] shadow-md p-6 rounded-md">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Assets Crossed Repair Threshold</h2>
              <span className="text-red-500 font-semibold text-sm">Suggested Repairs: {suggestedRepairs.length}</span>
            </div>
            
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead className="bg-gray-100 text-left text-sm">
                  <tr>
                    <th className="p-2 border">Asset type</th>
                    <th className="p-2 border">Asset name.</th>
                    <th className="p-2 border">asset model id.</th>
                    <th className="p-2 border">dealer.</th>
                    <th className="p-2 border">repair sent date.</th>
                    <th className="p-2 border">warranty/expiry.</th>
                    <th className="p-2 border">repair count</th>
                    <th className="p-2 border">delete/extend</th>
                  </tr>
                </thead>
                <tbody>
                  {suggestedRepairs.map((asset) => (
                    <tr key={asset._id || asset.id || asset.assetModelId} className="bg-white text-red-600">
                      <td className="p-2 border">{asset.assetType}</td>
                      <td className="p-2 border underline">{asset.assetName}</td>
                      <td className="p-2 border">{asset.assetModelId}</td>
                      <td className="p-2 border">{asset.dealer}</td>
                      <td className="p-2 border">{asset.repairSentDate ? new Date(asset.repairSentDate).toLocaleDateString() : "-"}</td>
                      <td className="p-2 border">{asset.warrantyDate ? new Date(asset.warrantyDate).toLocaleDateString() : "N/A"}</td>
                      <td className="p-2 border text-center">{asset.repairCount || 0}</td>
                      <td className="p-2 border flex justify-center space-x-2">
                        
                        <button
                          onClick={() => handleExtendAsset(asset)}
                          className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 text-sm"
                        >
                          Extend
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Note */}
            <p className="mt-4 text-sm text-gray-700 italic">
              Note: Software assets are marked red as they approach their expiry date and can be extended their expiry date (use extend button)
            </p>
          </div>
        )}

        {view === "addAsset" && (
          <div className="add-asset-form">
            <h2>Add service assets</h2>
            <form>
              <div className="input-group">
                <label>Asset Type:</label>
                <input
                  type="text"
                  value={newAsset.assetType}
                  onChange={(e) => setNewAsset({ ...newAsset, assetType: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label>Asset Name:</label>
                <input
                  type="text"
                  value={newAsset.assetName}
                  onChange={(e) => setNewAsset({ ...newAsset, assetName: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label>Asset Model ID:</label>
                <input
                  type="text"
                  value={newAsset.assetModelId}
                  onChange={(e) => setNewAsset({ ...newAsset, assetModelId: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label>Dealer:</label>
                <input
                  type="text"
                  value={newAsset.dealer}
                  onChange={(e) => setNewAsset({ ...newAsset, dealer: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label>Warranty Date:</label>
                <input
                  type="date"
                  value={newAsset.warrantyDate}
                  onChange={(e) => setNewAsset({ ...newAsset, warrantyDate: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label>Repair sent date:</label>
                <input
                  type="date"
                  value={newAsset.repairSentDate}
                  onChange={(e) => setNewAsset({ ...newAsset, repairSentDate: e.target.value })}
                />
              </div>
              <button type="button" onClick={handleAddAsset}>
                Add Asset
              </button>
            </form>
          </div>
        )}

        {view === "viewAsset" && (
          <div className="view-asset-list">
            <h2>Items in Repair</h2>
            <table>
              <thead>
                <tr>
                  <th>Asset Type</th>
                  <th>Asset Name</th>
                  <th>Model ID</th>
                  <th>Dealer</th>
                  <th>Warranty Date</th>
                  <th>Repair sent date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentAssets.map((asset) => (
                  <tr key={asset._id || asset.id || asset.assetModelId}>
                    <td>{asset.assetType}</td>
                    <td>{asset.assetName}</td>
                    <td>{asset.assetModelId}</td>
                    <td>{asset.dealer}</td>
                    <td>{asset.warrantyDate ? new Date(asset.warrantyDate).toLocaleDateString() : "N/A"}</td>
                    <td>{asset.repairSentDate ? new Date(asset.repairSentDate).toLocaleDateString() : "N/A"}</td>
                    <td>
                      <button onClick={() => handleDeleteAsset(  asset.assetModelId)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              <button onClick={handlePrevPage} disabled={currentPage === 1}>
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handleClickPage(i + 1)}
                  className={currentPage === i + 1 ? "active" : ""}
                >
                  {i + 1}
                </button>
              ))}
              <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          </div>
        )}

        {currentAsset && (
          <div className="extend-modal">
            <h3>Extend Warranty / Description</h3>
            <label>Repair Date:</label>
            <input
              type="date"
              value={currentRepairDate}
              onChange={(e) => setCurrentRepairDate(e.target.value)}
            />
            <button onClick={handleUpdateAsset}>Update</button>
            <button onClick={() => setCurrentAsset(null)}>Cancel</button>
          </div>
        )}

        {view === "warehouse" && <Warehouse />}

        {view === "upcomingAssets" && <Upcoming />}
      </div>
    </div>
  );
};

export default Maintenance;
