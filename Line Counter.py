import os

def count_lines_in_file(file_path):
    # check if file is html, css, js
    if not file_path.endswith(('.html', '.css', '.js')):
        return 0
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            print(f"Reading {file_path}")
            return sum(1 for line in file)
    except Exception as e:
        print(f"Could not read {file_path}: {e}")
        return 0

def count_lines_in_folder(folder_path, exclude_folders=None):
    total_lines = 0

    # Ensure exclude_folders is a set for faster lookup
    if exclude_folders is None:
        exclude_folders = set()

    for root, dirs, files in os.walk(folder_path):
        # Remove the excluded folders from dirs list to prevent walking into them
        dirs[:] = [d for d in dirs if d not in exclude_folders]

        for file in files:
            file_path = os.path.join(root, file)
            total_lines += count_lines_in_file(file_path)

    return total_lines

# Set the folder path and folders to exclude
folder_path = os.getcwd()
exclude_folders = {"node_modules"}  # Folder names to exclude (set)

# Count the total lines in all files, excluding specific folders
total_lines = count_lines_in_folder(folder_path, exclude_folders)

print(f"Total lines of code in {folder_path} (excluding certain folders): {total_lines}")
