import React, { useEffect } from "react";

function DevelopersPage() {
  useEffect(() => {
    document.title = "Developers - csgoed.com";
  }, []);

  return <div>for developers - coming soon</div>;
}

export default DevelopersPage;
