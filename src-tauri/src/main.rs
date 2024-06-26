// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


#[tauri::command]
fn is_component_enabled() -> bool {
    false
}



fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![is_component_enabled])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
