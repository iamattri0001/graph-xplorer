import React, { createContext, useContext, useState } from "react";

const GraphContext = createContext();

export function GraphProvider({ children }) {
  const [nodes, setNodes] = useState({});
  const [edges, setEdges] = useState([]);

  const [history, setHistory] = useState([]);

  const [deletedHistory, setDeletedHistory] = useState([]);

  const addHistory = (action) => {
    setHistory((prevState) => {
      let newHistory = [...prevState];

      while (newHistory.length > 20) {
        newHistory.shift();
      }

      newHistory.push(action);

      return newHistory;
    });
  };

  const getHistory = () => {
    if (history.length === 0) {
      return null;
    } else {
      let lastAction = history[history.length - 1];
      setHistory((prevState) => {
        let newHistory = [...prevState];
        newHistory.pop();
        return newHistory;
      });
      addDeletedHistory(lastAction);
      return lastAction;
    }
  };

  const resetHistory = () => {
    setHistory([]);
    setDeletedHistory([]);
  };

  const addDeletedHistory = (action) => {
    setDeletedHistory((prevState) => {
      let newDeletedHistory = [...prevState];

      while (newDeletedHistory.length > 20) {
        newDeletedHistory.shift();
      }
      newDeletedHistory.push(action);

      return newDeletedHistory;
    });
  };

  const getDeletedHistory = () => {
    if (deletedHistory.length === 0) {
      return null;
    } else {
      let lastAction = deletedHistory[deletedHistory.length - 1];
      setDeletedHistory((prevState) => {
        let newDeletedHistory = [...prevState];
        newDeletedHistory.pop();
        return newDeletedHistory;
      });
      addHistory(lastAction);
      return lastAction;
    }
  };

  return (
    <GraphContext.Provider
      value={{
        nodes,
        setNodes,
        edges,
        setEdges,
        addHistory,
        getHistory,
        getDeletedHistory,
        resetHistory,
      }}
    >
      {children}
    </GraphContext.Provider>
  );
}

export function useGraph() {
  const context = useContext(GraphContext);
  if (!context) {
    throw new Error("useGraph must be used within a GraphProvider");
  }
  return context;
}
