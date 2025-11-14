import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { IoTrash } from "react-icons/io5";
import { getDailyAffirmations } from "../helperFunctions/getDailyAffirmations";
import "../styles/UserHome.css";

export default function UserHome() {
  const API_URL = "https://affirmation-backend-91g3.onrender.com";
  const [affirmationCount, setAffirmationCount] = useState({
    1: 0,
    2: 0,
    3: 0,
  });
  const [affirmationList, setAffirmationList] = useState([]);
  const [selectedAffirmations, setSelectedAffirmations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [affFormData, setAffFormData] = useState("");
  const [actions, setActions] = useState({ 1: "", 2: "", 3: "" });
  const [actionFormData, setActionFormData] = useState({
    affirmationNumber: "1",
    action: "",
  });
  let user = null;

  try {
    const userString = sessionStorage.getItem("user");
    if (userString) {
      user = JSON.parse(userString);
    }
  } catch (error) {
    console.error("Failed to parse user:", error);
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userId = user?.id;

  async function newAffirmationFormSumbit(e) {
    e.preventDefault();
    const response = await fetch(
      `${API_URL}/api/user/${userId}/affirmation/list/${affFormData}`,
      {
        method: "POST",
      }
    );
    const data = await response.json();
    const newList = [...affirmationList, data.data];
    const selectedAffs = getDailyAffirmations(newList);

    setAffirmationList(newList);
    setSelectedAffirmations(selectedAffs);
    setAffFormData("");
    await resetCountAndActions();
  }

  useEffect(() => {
    async function fetchAffirmations() {
      try {
        //fetching affirmation count and affirmation list
        const response = await fetch(
          `${API_URL}/api/user/${userId}/affirmations`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch affirmations");
        }

        const data = await response.json();

        let newDataObj = {};
        for (let aff of data.data.affCount) {
          newDataObj[aff.affirmation_number] = aff.affirmation_count;
        }
        setAffirmationCount(newDataObj);
        setAffirmationList(data.data.affList.rows);
        const selectedAffs = getDailyAffirmations(data.data.affList.rows);
        setSelectedAffirmations(selectedAffs);
      } catch (error) {
        console.error("Error fetching affirmations:", error);
      } finally {
        setLoading(false);
      }
    }

    async function fetchActions() {
      try {
        const response = await fetch(`${API_URL}/api/user/${userId}/actions`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch actions");
        }

        const result = await response.json();
        const actionsData = result.data;

        // Build actions object from the response array
        const actionsObj = { 1: "", 2: "", 3: "" };
        actionsData.forEach((action) => {
          actionsObj[action.affirmation_number] = action.action_text || "";
        });

        setActions(actionsObj);
      } catch (error) {
        console.error("Error fetching actions:", error);
      }
    }

    if (userId) {
      fetchActions();
      fetchAffirmations();

    }
  }, [userId]);

  async function onButtonPress(num) {
    try {
      if (affirmationCount[num] >= 25) return;

      setAffirmationCount((prev) => ({
        ...prev,
        [num]: prev[num] + 1,
      }));

      const response = await fetch(
        `${API_URL}/api/user/${user.id}/affirmation/count/${num}`,
        {
          method: "PATCH",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update affirmation");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error updating affirmation: ", error);

      setAffirmationCount((prev) => ({
        ...prev,
        [num]: prev[num] - 1,
      }));
      alert("Failed to save. Please try again.");
    }
  }

  async function deleteAffirmation(affIndex, id) {
    let newList = affirmationList.filter(
      (affData, index) => index !== affIndex
    );
    setAffirmationList(newList);
    const selectedAffs = getDailyAffirmations(newList);
    setSelectedAffirmations(selectedAffs);

    const response = await fetch(`${API_URL}/api/affirmation/${id}`, {
      method: "DELETE",
    });

    await resetCountAndActions();
  }

  async function resetCountAndActions() {
    const resetCountResponse = await fetch(
      `${API_URL}/api/user/${userId}/affirmation/reset`,
      {
        method: "PATCH",
      }
    );

    setAffirmationCount({
      1: 0,
      2: 0,
      3: 0,
    });
    
    setActions({
      1: "",
      2: "",
      3: "",
    });
    
    console.log("count and actions reset");
  }

  async function handleActionSubmit(e) {
    e.preventDefault();

    if (!actionFormData.action.trim()) {
      alert("Please enter an action");
      return;
    }
    const { affirmationNumber, action } = actionFormData;

    setActions((prev) => ({
      ...prev,
      [affirmationNumber]: action,
    }));

    const response = await fetch(
      `${API_URL}/api/user/${userId}/affirmation/${affirmationNumber}/action`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update action");
    }

    setActionFormData({ affirmationNumber: "1", action: "" });
  }
  return (
    <div className="user-home">
      <h1>Hello {user.name}!</h1>

      {loading ? (
        <div className="loading">Loading your affirmations...</div>
      ) : affirmationList.length >= 3 ? (
        <>
          <div className="affirmations-grid">
            {[1, 2, 3].map((num) => {
              const opacity = Math.min(affirmationCount[num] * 0.04, 1);
              return (
                <button
                  key={num}
                  onClick={() => onButtonPress(num)}
                  className="affirmation-button"
                  style={{
                    opacity: 0.2 + opacity * 0.8,
                    backgroundColor: "#3b82f6",
                  }}
                  disabled={affirmationCount[num] >= 25}
                >
                  <span className="count-badge">
                    {affirmationCount[num]}/25
                  </span>
                  {selectedAffirmations[num - 1]?.affirmation}
                </button>
              );
            })}
          </div>

          {/* Actions Section */}
          <div className="actions-section">
            <h2>Today's Actions</h2>
            <div className="actions-list">
              {[1, 2, 3].map((num) => (
                <div key={num} className="action-item">
                  <span className="action-number">•</span>
                  <div className="action-content">
                    <strong>
                      {selectedAffirmations[num - 1]?.affirmation} :
                    </strong>
                    <span className="action-text">
                      {actions[num] || "No action added yet"}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Form */}
            <form className="action-form" onSubmit={handleActionSubmit}>
              <select
                value={actionFormData.affirmationNumber}
                onChange={(e) =>
                  setActionFormData((prev) => ({
                    ...prev,
                    affirmationNumber: e.target.value,
                  }))
                }
                className="action-select"
              >
                {[1, 2, 3].map((num) => (
                  <option key={num} value={num}>
                    Affirmation {num}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={actionFormData.action}
                onChange={(e) =>
                  setActionFormData((prev) => ({
                    ...prev,
                    action: e.target.value,
                  }))
                }
                placeholder="What action did you take?"
                className="action-input"
              />
              <button type="submit" className="action-submit-button">
                Add Action
              </button>
            </form>
          </div>
        </>
      ) : (
        <div className="welcome-message">
          <p>You need at least 3 affirmations to start tracking.</p>
          <p>Current affirmations: {affirmationList.length}/3</p>
        </div>
      )}

      <form className="affirmation-form" onSubmit={newAffirmationFormSumbit}>
        <input
          id="name"
          type="text"
          value={affFormData}
          onChange={(e) => setAffFormData(e.target.value)}
          placeholder="Enter your new affirmation"
          className="affirmation-input"
        />
        <button type="submit" className="submit-button">
          Add Affirmation
        </button>
        {affirmationList.length >= 3 && (
          <p className="note">
            Note: Adding or deleting affirmations will refresh your daily
            selection
          </p>
        )}
      </form>

      {/* iOS-style list of all affirmations */}
      <div className="affirmations-list">
        {!loading &&
          affirmationList.map((data, index) => (
            <div key={data.id} className="affirmation-item">
              <span>{data.affirmation}</span>
              <button
                className="delete-button"
                onClick={() => deleteAffirmation(index, data.id)}
                aria-label="Delete affirmation"
              >
                <IoTrash />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
