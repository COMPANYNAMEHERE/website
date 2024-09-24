def intro():
    print("------------------------------------------------")
    print("Welcome to the Adventure!")
    print("------------------------------------------------")
    print("You find yourself standing at the edge of a dark forest. The trees are tall and thick, ")
    print("their twisted branches blocking out most of the light. A narrow path leads into the forest, ")
    print("and to your left, you see a small, abandoned cottage.")
    print(" ")
    print("What would you like to do?")
    print("1. Enter the forest.")
    print("2. Investigate the cottage.")
    print("3. Leave the area.")
    
    choice = input("Enter the number of your choice: ")

    

    if choice == "1":
        enter_forest()
    elif choice == "2":
        investigate_cottage()
    elif choice == "3":
        leave_area()
    else:
        print("Invalid choice. Please try again.")
        intro()

def enter_forest():
    print("You step cautiously into the forest, the path ahead barely visible...")

def investigate_cottage():
    print("You walk towards the cottage. The door creaks as you push it open...")

def leave_area():
    print("You decide to leave the area. Perhaps another time, you’ll explore it further...")


intro()