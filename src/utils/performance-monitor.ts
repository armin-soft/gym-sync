
/**
 * Utility for monitoring performance and debugging performance issues
 */

interface PerformanceData {
  component: string;
  startTime: number;
  endTime?: number;
  duration?: number;
}

class PerformanceMonitor {
  private metrics: Record<string, PerformanceData[]> = {};
  private enabled: boolean = false;
  private threshold: number = 100; // milliseconds
  
  enable(threshold?: number) {
    this.enabled = true;
    if (threshold) {
      this.threshold = threshold;
    }
    console.log(`[Performance Monitor] Enabled with threshold ${this.threshold}ms`);
  }
  
  disable() {
    this.enabled = false;
  }
  
  start(componentName: string) {
    if (!this.enabled) return;
    
    const metric: PerformanceData = {
      component: componentName,
      startTime: performance.now()
    };
    
    if (!this.metrics[componentName]) {
      this.metrics[componentName] = [];
    }
    
    this.metrics[componentName].push(metric);
    return this.metrics[componentName].length - 1;
  }
  
  end(componentName: string, index?: number) {
    if (!this.enabled) return;
    
    if (!this.metrics[componentName]) {
      console.warn(`[Performance Monitor] No start metric found for ${componentName}`);
      return;
    }
    
    const metricIndex = index !== undefined ? index : this.metrics[componentName].length - 1;
    const metric = this.metrics[componentName][metricIndex];
    
    if (!metric) {
      console.warn(`[Performance Monitor] No start metric found for ${componentName} at index ${metricIndex}`);
      return;
    }
    
    metric.endTime = performance.now();
    metric.duration = metric.endTime - metric.startTime;
    
    if (metric.duration > this.threshold) {
      console.warn(`[Performance Monitor] Slow operation detected in ${componentName}: ${metric.duration.toFixed(2)}ms`);
    }
    
    return metric.duration;
  }
  
  getMetrics() {
    return this.metrics;
  }
  
  clearMetrics() {
    this.metrics = {};
  }
}

// Export a singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Helper hook for React components
export function usePerformanceMonitoring(componentName: string) {
  return {
    startMeasure: () => performanceMonitor.start(componentName),
    endMeasure: (index?: number) => performanceMonitor.end(componentName, index)
  };
}
