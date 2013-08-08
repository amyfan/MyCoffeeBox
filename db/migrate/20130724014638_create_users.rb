class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name, :null => false, :default => ""
      t.string :email, :null => false, :default => ""
      t.string :phone
      t.string :user_role
      t.datetime :last_used
      t.integer :is_active

      t.timestamps
    end
  end
end
