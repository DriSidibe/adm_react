import json
import sqlite3


def sqlite_to_json_with_relations(db_path, json_path):
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    # Get table info with foreign keys
    cursor.execute("PRAGMA foreign_key_list;")
    foreign_keys = cursor.fetchall()
    
    # Get all tables
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = [table[0] for table in cursor.fetchall()]
    
    database_data = {}
    
    for table in tables:
        if table.startswith('sqlite_'):
            continue
            
        # Get table structure to identify foreign keys
        cursor.execute(f"PRAGMA table_info({table});")
        columns = cursor.fetchall()
        
        cursor.execute(f"SELECT * FROM {table};")
        rows = cursor.fetchall()
        
        table_data = []
        for row in rows:
            row_dict = dict(row)
            
            # Handle foreign keys by fetching related data
            for col in columns:
                if col['name'].endswith('_id') and col['name'] != 'id':
                    related_table = col['name'].replace('_id', '')
                    if related_table in tables:
                        fk_value = row_dict[col['name']]
                        if fk_value:
                            cursor.execute(f"SELECT * FROM {related_table} WHERE id = ?", (fk_value,))
                            related_data = cursor.fetchone()
                            if related_data:
                                row_dict[related_table] = dict(related_data)
            
            table_data.append(row_dict)
        
        database_data[table] = table_data
    
    with open(json_path, 'w', encoding='utf-8') as json_file:
        json.dump(database_data, json_file, indent=4, ensure_ascii=False)

    conn.close()
    print(f"Database with relations exported to {json_path}")

# Usage
sqlite_to_json_with_relations('./db.sqlite3', 'database_with_relations.json')