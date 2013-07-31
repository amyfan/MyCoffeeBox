class CreateShipments < ActiveRecord::Migration
  def change
    create_table :shipments do |t|
      t.datetime :shipped_date
      t.datetime :received_date
      t.string :shipment_status
      t.decimal :shipment_cost
      t.string :shipping_provider
      t.string :notes

      t.timestamps
    end
  end
end
