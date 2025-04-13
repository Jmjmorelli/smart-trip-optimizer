#include <iostream>
#include <fstream>
#include <nlohmann/json.hpp>  // Use this include if installed via a package manager (vcpkg, conan, etc.)
// #include "json.hpp"       // Alternatively, use this if you're using the manually downloaded header

using json = nlohmann::json;

// Recursive function to print all JSON keys and values
void printJson(const json &j, const std::string &indent = "")
{
    if (j.is_object())
    {
        for (auto &element : j.items())
        {
            std::cout << indent << element.key() << " : ";
            if (element.value().is_primitive())
            {
                std::cout << element.value() << std::endl;
            }
            else
            {
                std::cout << std::endl;
                printJson(element.value(), indent + "  ");
            }
        }
    }
    else if (j.is_array())
    {
        int index = 0;
        for (auto &element : j)
        {
            std::cout << indent << "[" << index << "] : ";
            if (element.is_primitive())
            {
                std::cout << element << std::endl;
            }
            else
            {
                std::cout << std::endl;
                printJson(element, indent + "  ");
            }
            index++;
        }
    }
    else
    {
        std::cout << indent << j << std::endl;
    }
}

int main()
{
    // 1. Open the JSON file. Adjust the path based on your working directory.
    std::ifstream inputFile("../input.json");
    if (!inputFile.is_open()) {
        std::cerr << "Could not open JSON file!" << std::endl;
        return 1;
    }

    // 2. Parse the JSON file.
    json j;
    try {
        inputFile >> j;
    }
    catch (const json::parse_error& err) {
        std::cerr << "JSON parse error: " << err.what() << std::endl;
        return 1;
    }

    // 3. Process the JSON data.
    
    // userID
    if (j.contains("userID"))
    {
        int userID = j["userID"];
        std::cout << "userID: " << userID << std::endl;
    }

    // location: latitude and longitude
    if (j.contains("location"))
    {
        json location = j["location"];
        if (location.contains("latitude") && location.contains("longitude"))
        {
            double latitude = location["latitude"];
            double longitude = location["longitude"];
            std::cout << "location: latitude = " << latitude << ", longitude = " << longitude << std::endl;
        }
    }

    // locationRestriction: center (with latitude and longitude) and radiusMiles
    if (j.contains("locationRestriction"))
    {
        json locationRestriction = j["locationRestriction"];

        // Extracting center values
        if (locationRestriction.contains("center"))
        {
            json center = locationRestriction["center"];
            if (center.contains("latitude") && center.contains("longitude"))
            {
                double centerLatitude = center["latitude"];
                double centerLongitude = center["longitude"];
                std::cout << "locationRestriction center: latitude = " << centerLatitude 
                          << ", longitude = " << centerLongitude << std::endl;
            }
        }

        // Extracting radiusMiles
        if (locationRestriction.contains("radiusMiles"))
        {
            int radiusMiles = locationRestriction["radiusMiles"];
            std::cout << "locationRestriction radiusMiles: " << radiusMiles << std::endl;
        }
    }

    // totalAvailableTime: startDate and endDate
    if (j.contains("totalAvailableTime"))
    {
        json totalAvailableTime = j["totalAvailableTime"];
        if (totalAvailableTime.contains("startDate") && totalAvailableTime.contains("endDate"))
        {
            std::string startDate = totalAvailableTime["startDate"];
            std::string endDate = totalAvailableTime["endDate"];
            std::cout << "totalAvailableTime: startDate = " << startDate 
                      << ", endDate = " << endDate << std::endl;
        }
    }

    // operatingHours: start and end times
    if (j.contains("operatingHours"))
    {
        json operatingHours = j["operatingHours"];
        if (operatingHours.contains("start") && operatingHours.contains("end"))
        {
            std::string startTime = operatingHours["start"];
            std::string endTime = operatingHours["end"];
            std::cout << "operatingHours: start = " << startTime 
                      << ", end = " << endTime << std::endl;
        }
    }

    // budgetCost: minimal and maximum cost
    if (j.contains("budgetCost"))
    {
        json budgetCost = j["budgetCost"];
        if(budgetCost.contains("minimal") && budgetCost.contains("maximum"))
        {
            double minimal = budgetCost["minimal"];
            double maximum = budgetCost["maximum"];
            std::cout << "budgetCost: minimal = " << minimal 
                      << ", maximum = " << maximum << std::endl;
        }
    }

    // preferences: multiple preference fields
    if (j.contains("preferences"))
    {
        json preferences = j["preferences"];
        if (preferences.contains("preference"))
        {
            std::string preference = preferences["preference"];
            std::cout << "preferences: preference = " << preference << std::endl;
        }
        if (preferences.contains("accessibleSeating"))
        {
            bool accessibleSeating = preferences["accessibleSeating"];
            std::cout << "preferences: accessibleSeating = " << std::boolalpha 
                      << accessibleSeating << std::endl;
        }
        if (preferences.contains("preferredMeal"))
        {
            std::string preferredMeal = preferences["preferredMeal"];
            std::cout << "preferences: preferredMeal = " << preferredMeal << std::endl;
        }
        if (preferences.contains("notes"))
        {
            std::string notes = preferences["notes"];
            std::cout << "preferences: notes = " << notes << std::endl;
        }
    }

    // restriction: dietaryRestriction
    if (j.contains("restriction"))
    {
        json restriction = j["restriction"];
        if (restriction.contains("dietaryRestriction"))
        {
            std::string dietaryRestriction = restriction["dietaryRestriction"];
            std::cout << "restriction: dietaryRestriction = " << dietaryRestriction << std::endl;
        }
    }

    // 4. Manipulate the JSON data if needed.
    // For example, we can add a new field or update an existing one.
    j["newField"] = "This is a new field!";
    // Overwrite userID as an example
    j["userID"] = 99;
    
    // Print the updated JSON with pretty printing (4 spaces indent)
    std::cout << "\nUpdated JSON using dump(4):\n" << j.dump(4) << std::endl;
    
    // Additionally, print out every element of the JSON structure recursively.
    std::cout << "\nFull JSON printed recursively:" << std::endl;
    printJson(j);

    inputFile.close();
    return 0;
}
