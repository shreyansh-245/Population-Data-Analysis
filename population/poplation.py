import numpy as np
import matplotlib.pyplot as plt

def analyze_data():
    """
    Generates a NumPy array of random data, calculates key statistics,
    and visualizes the data with a histogram.
    """
    # 1. Generate a NumPy array of 1000 random data points
    # The data is normally distributed with a mean of 50 and a standard deviation of 10.
    print("Generating 1000 data points...")
    data = np.random.normal(loc=50, scale=10, size=1000)

    # 2. Calculate and print basic statistics using NumPy
    mean_value = np.mean(data)
    std_dev = np.std(data)
    min_value = np.min(data)
    max_value = np.max(data)

    print("\n--- Data Statistics ---")
    print(f"Mean: {mean_value:.2f}")
    print(f"Standard Deviation: {std_dev:.2f}")
    print(f"Minimum Value: {min_value:.2f}")
    print(f"Maximum Value: {max_value:.2f}")

    # 3. Create a simple histogram using Matplotlib to visualize the data distribution
    print("\nCreating histogram...")
    plt.figure(figsize=(10, 6))
    plt.hist(data, bins=30, color='skyblue', edgecolor='black', alpha=0.7)
    plt.title('Histogram of Generated Data')
    plt.xlabel('Value')
    plt.ylabel('Frequency')
    plt.grid(axis='y', linestyle='--', alpha=0.6)
    plt.show()

if __name__ == "__main__":
    # Check if the required libraries are installed.
    try:
        analyze_data()
    except ImportError as e:
        print(f"Error: {e}")
        print("\nPlease install the required libraries:")
        print("pip install numpy matplotlib")
