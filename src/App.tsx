import { useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Home } from "@/pages/home";
import { Grupo260 } from "@/pages/grupo-260";
import { NotFound } from "@/pages/not-found";

// Start each page at the top, unless the URL points at a section (#projects)
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0);
  }, [location]);
  return null;
}

export function App() {
  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <SiteHeader />
      <main>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/projects/grupo-260" component={Grupo260} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <SiteFooter />
    </div>
  );
}
